"""Load a fixed catalog: 3 categories and 8 products, each one with a generated image."""
from decimal import Decimal
from io import BytesIO

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from PIL import Image, ImageDraw, ImageFont

from catalog.models import Category, Product

CATEGORIES = [
    ("Laptops", "Equipos portátiles para estudio y trabajo"),
    ("Periféricos", "Teclados, ratones y accesorios de escritorio"),
    ("Almacenamiento", "Memorias, discos y unidades externas"),
]

PRODUCTS = [
    ("Laptop Lenovo IdeaPad 14", "Laptops", "2499.90", 6,
     "Pantalla de 14 pulgadas, 16 GB de RAM y 512 GB SSD.", "#2563eb"),
    ("Laptop HP Pavilion 15", "Laptops", "3199.00", 4,
     "Procesador Core i7 de 13va generación y teclado numérico.", "#1d4ed8"),
    ("Laptop Asus VivoBook 13", "Laptops", "2150.50", 3,
     "Ultraligera de 1,3 kg, pensada para llevar a clase.", "#3b82f6"),
    ("Mouse inalámbrico Logitech M170", "Periféricos", "39.90", 25,
     "Receptor USB de 2,4 GHz y batería de doce meses.", "#059669"),
    ("Teclado mecánico Redragon K552", "Periféricos", "189.00", 10,
     "Switches azules, retroiluminación y formato compacto.", "#047857"),
    ("Audífonos HyperX Cloud Stinger", "Periféricos", "229.90", 8,
     "Diadema acolchada y micrófono con silencio por giro.", "#10b981"),
    ("Memoria USB Kingston 64 GB", "Almacenamiento", "24.99", 40,
     "USB 3.2 con tapa deslizante y lectura rápida.", "#b45309"),
    ("Disco externo Seagate 1 TB", "Almacenamiento", "289.00", 12,
     "Disco portátil USB 3.0, sin fuente de poder externa.", "#92400e"),
]


def make_image(text, color):
    """Build a simple 480x360 cover with the product name, so every card has an image."""
    image = Image.new("RGB", (480, 360), color)
    draw = ImageDraw.Draw(image)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
    except OSError:
        font = ImageFont.load_default()
    words, lines, current = text.split(), [], ""
    for word in words:
        probe = f"{current} {word}".strip()
        if draw.textlength(probe, font=font) > 420:
            lines.append(current)
            current = word
        else:
            current = probe
    lines.append(current)
    y = 180 - (len(lines) * 38) // 2
    for line in lines:
        draw.text(((480 - draw.textlength(line, font=font)) / 2, y), line, font=font, fill="white")
        y += 38
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return ContentFile(buffer.getvalue())


class Command(BaseCommand):
    help = "Carga el catálogo de demostración: 3 categorías y 8 productos con imagen."

    def handle(self, *args, **options):
        Product.objects.all().delete()
        Category.objects.all().delete()
        categories = {
            name: Category.objects.create(name=name, description=description)
            for name, description in CATEGORIES
        }
        for name, category, price, stock, description, color in PRODUCTS:
            product = Product(
                name=name,
                category=categories[category],
                price=Decimal(price),
                stock=stock,
                description=description,
            )
            slug = name.lower().replace(" ", "-")
            product.image.save(f"{slug}.png", make_image(name, color), save=False)
            product.save()
        self.stdout.write(self.style.SUCCESS(
            f"Catálogo cargado: {Category.objects.count()} categorías y {Product.objects.count()} productos."
        ))

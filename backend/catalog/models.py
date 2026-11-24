"""Catalog of the e-commerce: categories and products (week 13)."""
from django.db import models


class Category(models.Model):
    name = models.CharField("nombre", max_length=60, unique=True)
    description = models.CharField("descripción", max_length=200, blank=True)

    class Meta:
        verbose_name = "categoría"
        verbose_name_plural = "categorías"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category, verbose_name="categoría", related_name="products", on_delete=models.PROTECT
    )
    name = models.CharField("nombre", max_length=120)
    description = models.TextField("descripción", blank=True)
    price = models.DecimalField("precio", max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField("existencias", default=0)
    image = models.ImageField("imagen", upload_to="products/", blank=True, null=True)
    created_at = models.DateTimeField("creado", auto_now_add=True)

    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"
        ordering = ["name"]

    def __str__(self):
        return self.name

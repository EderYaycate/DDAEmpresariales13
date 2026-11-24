from django.contrib import admin

from catalog.models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "product_count")
    search_fields = ("name",)

    @admin.display(description="productos")
    def product_count(self, obj):
        return obj.products.count()


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "created_at")
    list_filter = ("category",)
    search_fields = ("name", "description")
    list_editable = ("price", "stock")
    autocomplete_fields = ()

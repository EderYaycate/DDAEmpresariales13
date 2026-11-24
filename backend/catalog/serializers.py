"""Serializers of the catalog. The product carries its category NESTED, so the catalog page
needs ONE request and not two."""
from rest_framework import serializers

from catalog.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]


class ProductSerializer(serializers.ModelSerializer):
    # read: the whole category object; write: just its id
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id", "name", "description", "price", "stock",
            "image", "category", "category_id", "created_at",
        ]

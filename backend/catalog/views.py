"""Catalog resources. select_related avoids one extra query per product (N+1)."""
from rest_framework import viewsets

from catalog.models import Category, Product
from catalog.serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.select_related("category").all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category_id=category)
        return queryset

from rest_framework.permissions import IsAdminUser, SAFE_METHODS


class IsAdminUserOrReadOnlyAndIsAuthenticated(IsAdminUser):
    """Adapted from: https://stackoverflow.com/a/37974815"""

    def has_permission(self, request, view):
        print(request.user)
        is_admin = super().has_permission(request, view)
        return (request.method in SAFE_METHODS and request.user.id != None) or is_admin

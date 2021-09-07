from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

# Allows only a admin user to access certain routes when this mixin is used
class SuperUserRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_superuser

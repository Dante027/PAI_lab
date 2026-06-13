namespace HomePantry.Views;

public partial class CategoriesPage : ContentPage
{
    public CategoriesPage()
    {
        InitializeComponent();
    }

    private async void OnMlekoClicked(object? sender, EventArgs e) =>
        await Shell.Current.GoToAsync($"{nameof(ProductDetailPage)}?id=mleko");

    private async void OnChlebClicked(object? sender, EventArgs e) =>
        await Shell.Current.GoToAsync($"{nameof(ProductDetailPage)}?id=chleb");

    private async void OnKurczakClicked(object? sender, EventArgs e) =>
        await Shell.Current.GoToAsync($"{nameof(ProductDetailPage)}?id=kurczak");

    private async void OnJablkaClicked(object? sender, EventArgs e) =>
        await Shell.Current.GoToAsync($"{nameof(ProductDetailPage)}?id=jablka");
}

using HomePantry.ViewModels;

namespace HomePantry.Views;

public partial class PantryPage : ContentPage
{
    public PantryPage()
    {
        InitializeComponent();
        BindingContext = new PantryInfo
        {
            DateText = $"{DateTime.Now:dddd, dd MMMM yyyy}",
            ProductCountText = "Produktów: 4",
            ExpiredCountText = "Przeterminowanych: 0"
        };
    }

    private async void OnAddFirstProductClicked(object? sender, EventArgs e)
    {
        await DisplayAlert("Spiżarnia", "Przejdź do zakładki „Dodaj”, aby dodać pierwszy produkt do spiżarni.", "OK");
    }
}

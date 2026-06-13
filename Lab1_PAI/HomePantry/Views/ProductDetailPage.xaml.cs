namespace HomePantry.Views;

[QueryProperty(nameof(ProductId), "id")]
public partial class ProductDetailPage : ContentPage
{
    private string _productId = string.Empty;

    public string ProductId
    {
        get => _productId;
        set
        {
            _productId = value;
            LoadProduct(value);
        }
    }

    private static readonly Dictionary<string, (string Nazwa, string Kategoria, string Ilosc, string Waznosc, string Status, string Uwagi)> Products = new()
    {
        ["mleko"] = ("Mleko 3,2%", "Nabiał", "2 l", "12.06.2026", "Zamknięty", "Przechowywać w lodówce"),
        ["chleb"] = ("Chleb żytni", "Pieczywo", "1 szt.", "05.06.2026", "Otwarty", "Zużyć w ciągu 2 dni"),
        ["kurczak"] = ("Kurczak filet", "Mięso i wędliny", "500 g", "08.06.2026", "Zamknięty", "Termin po otwarciu: 2 dni"),
        ["jablka"] = ("Jabłka Gala", "Warzywa i owoce", "1 kg", "10.06.2026", "Zamknięty", "Przechowywać w chłodnym miejscu")
    };

    public ProductDetailPage()
    {
        InitializeComponent();
    }

    private void LoadProduct(string id)
    {
        if (!Products.TryGetValue(id, out var product))
        {
            lblNazwa.Text = "Nieznany produkt";
            return;
        }

        lblNazwa.Text = product.Nazwa;
        lblKategoria.Text = $"Kategoria: {product.Kategoria}";
        lblIlosc.Text = $"Ilość: {product.Ilosc}";
        lblWaznosc.Text = $"Data ważności: {product.Waznosc}";
        lblStatus.Text = $"Status: {product.Status}";
        lblUwagi.Text = $"Uwagi: {product.Uwagi}";
    }

    private async void OnBackClicked(object? sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("..");
    }
}

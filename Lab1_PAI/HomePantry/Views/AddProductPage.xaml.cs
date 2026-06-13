namespace HomePantry.Views;

public partial class AddProductPage : ContentPage
{
    private static readonly string[] Kategorie =
    {
        "Nabiał",
        "Pieczywo",
        "Mięso i wędliny",
        "Warzywa i owoce",
        "Napoje",
        "Inne"
    };

    public AddProductPage()
    {
        InitializeComponent();
        pickKategoria.ItemsSource = Kategorie;
        dpWaznosc.MinimumDate = DateTime.Today;
        dpWaznosc.Date = DateTime.Today.AddDays(7);
    }

    private async void OnDodajClicked(object? sender, EventArgs e)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(entNazwa.Text))
            {
                await DisplayAlert("Błąd", "Należy podać nazwę produktu!", "OK");
                return;
            }

            var kategoria = pickKategoria.SelectedItem?.ToString() ?? "brak";
            var ilosc = string.IsNullOrWhiteSpace(entIlosc.Text) ? "brak" : entIlosc.Text.Trim();
            var jednostka = string.IsNullOrWhiteSpace(entJednostka.Text) ? "" : entJednostka.Text.Trim();
            var uwagi = string.IsNullOrWhiteSpace(edtUwagi.Text) ? "brak" : edtUwagi.Text.Trim();
            var otwarty = swOtwarte.IsToggled ? "tak" : "nie";

            await DisplayAlert("Dodano produkt",
                $"Nazwa: {entNazwa.Text.Trim()}\n" +
                $"Ilość: {ilosc} {jednostka}\n" +
                $"Kategoria: {kategoria}\n" +
                $"Ważność: {dpWaznosc.Date:dd.MM.yyyy}\n" +
                $"Otwarty: {otwarty}\n" +
                $"Uwagi: {uwagi}",
                "OK");

            ClearForm();
        }
        catch (Exception ex)
        {
            await DisplayAlert("Błąd", $"Nie udało się dodać produktu: {ex.Message}", "OK");
        }
    }

    private void ClearForm()
    {
        entNazwa.Text = "";
        entIlosc.Text = "";
        entJednostka.Text = "";
        edtUwagi.Text = "";
        swOtwarte.IsToggled = false;
        dpWaznosc.Date = DateTime.Today.AddDays(7);

        // SelectedIndex = -1 wywala WinUI – bezpieczne odświeżenie pickera
        pickKategoria.ItemsSource = null;
        pickKategoria.ItemsSource = Kategorie;
    }
}

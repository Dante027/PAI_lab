namespace HomePantry.Views.Controls;

public partial class ProductCard : ContentView
{
    public static readonly BindableProperty ProductNameProperty =
        BindableProperty.Create(nameof(ProductName), typeof(string), typeof(ProductCard), string.Empty);

    public static readonly BindableProperty ProductInfoProperty =
        BindableProperty.Create(nameof(ProductInfo), typeof(string), typeof(ProductCard), string.Empty);

    public static readonly BindableProperty ExpiryDateProperty =
        BindableProperty.Create(nameof(ExpiryDate), typeof(string), typeof(ProductCard), string.Empty);

    public string ProductName
    {
        get => (string)GetValue(ProductNameProperty);
        set => SetValue(ProductNameProperty, value);
    }

    public string ProductInfo
    {
        get => (string)GetValue(ProductInfoProperty);
        set => SetValue(ProductInfoProperty, value);
    }

    public string ExpiryDate
    {
        get => (string)GetValue(ExpiryDateProperty);
        set => SetValue(ExpiryDateProperty, value);
    }

    public ProductCard()
    {
        InitializeComponent();
        BindingContext = this;
    }
}

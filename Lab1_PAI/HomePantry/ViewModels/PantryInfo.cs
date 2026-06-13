namespace HomePantry.ViewModels;

public class PantryInfo
{
    public string DateText { get; set; } = string.Empty;
    public string ProductCountText { get; set; } = "Produktów: 0";
    public string ExpiredCountText { get; set; } = "Przeterminowanych: 0";
    public string Subtitle { get; set; } = "Twoja wirtualna spiżarnia – zawsze pod ręką!";
}

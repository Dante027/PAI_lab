# HomePantry – Laboratorium 1 (.NET MAUI)

## Uruchomienie

1. Zainstaluj **.NET 8 SDK** i workload MAUI:
   ```
   dotnet workload install maui
   ```
2. Otwórz `HomePantry.csproj` w **Visual Studio 2022** (workload „.NET Multi-platform App UI development”).
3. Wybierz platformę: **Windows Machine** lub emulator **Android**.
4. Naciśnij **F5**.

Z linii poleceń (Windows):
```
cd HomePantry
dotnet build -f net8.0-windows10.0.19041.0
dotnet run -f net8.0-windows10.0.19041.0
```

## Struktura (zadanie lab.)

- `Views/` – strony (PantryPage, AddProductPage, CategoriesPage, SettingsPage, ProductDetailPage, MainPage)
- `Views/Controls/` – ProductCard
- `ViewModels/` – PantryInfo (data binding)
- `AppShell.xaml` – TabBar (komentarz o różnicy Android/Windows)

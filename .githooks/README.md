# Git hooks

Deze map bevat lokale repository-hooks.

De belangrijkste hook is:

- `pre-commit`

Deze hook blokkeert standaard commits die de bevroren PoC raken.

## Override

Alleen voor een expliciete uitzondering kan de hook tijdelijk worden overruled met:

```powershell
$env:ALLOW_POC_CHANGES="1"
git commit -m "..."
```

Daarna kun je de variabele weer verwijderen:

```powershell
Remove-Item Env:ALLOW_POC_CHANGES
```

## Belangrijk

Deze bescherming is praktisch sterk, maar niet absoluut:

- een gebruiker kan hooks uitschakelen of bypassen;
- echte afdwinging op teamniveau vraagt ook GitHub branch protection.

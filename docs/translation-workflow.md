# Translation Development Workflow

## 🎯 **RULE: NO HARDCODED TEXT**
Every piece of text in the application MUST use the `t()` function.

## 📝 **Adding New Content - Step by Step**

### 1. **Add Translation Keys First**
Before writing any component, add your translation keys to `lib/translations-complete.ts`:

\`\`\`typescript
// Add to all 4 languages
"yourSection.title": "Your Title",
"yourSection.description": "Your description",
"yourSection.buttonText": "Click Me",
\`\`\`

### 2. **Use in Components**
\`\`\`tsx
import { t } from "@/lib/translations-complete"

export function YourComponent() {
  return (
    <div>
      <h1>{t("yourSection.title")}</h1>
      <p>{t("yourSection.description")}</p>
      <button>{t("yourSection.buttonText")}</button>
    </div>
  )
}
\`\`\`

### 3. **Test All Languages**
- Switch to each language and verify all text displays
- Check browser console for missing translation warnings

## 🔧 **Development Helpers**

### Missing Key Detection
The system automatically logs missing keys in development:
\`\`\`
🌐 Missing translation key: "newFeature.title"
Add this to translations: "newFeature.title": "Your English text here"
\`\`\`

### Quick Translation Helper
\`\`\`typescript
import { addTranslation } from "@/lib/translations-complete"

// Use this helper to generate translation entries
addTranslation("newFeature.title", {
  en: "New Feature",
  pt: "Nova Funcionalidade", 
  es: "Nueva Característica",
  fr: "Nouvelle Fonctionnalité"
})
\`\`\`

## 📋 **Translation Key Naming Convention**

\`\`\`
section.element.type
\`\`\`

Examples:
- `dashboard.welcome` - Dashboard welcome message
- `exercises.title` - Exercises page title
- `auth.signIn` - Sign in button
- `common.save` - Common save button
- `nav.overview` - Navigation overview link

## ✅ **Pre-Development Checklist**

Before adding ANY new feature:
1. ✅ Plan your translation keys
2. ✅ Add keys to all 4 languages
3. ✅ Use `t()` function for ALL text
4. ✅ Test in all languages
5. ✅ Check console for missing keys

## 🚫 **NEVER DO THIS**
\`\`\`tsx
// ❌ WRONG - Hardcoded text
<h1>Welcome to Dashboard</h1>
<button>Save Changes</button>

// ✅ CORRECT - Using translations
<h1>{t("dashboard.welcome")}</h1>
<button>{t("common.save")}</button>
\`\`\`

This workflow ensures consistent translations from day one!
\`\`\`

Now let me update the key components to use the new translation system consistently:

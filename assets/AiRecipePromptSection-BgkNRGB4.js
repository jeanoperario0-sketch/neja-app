import{o as e}from"./rolldown-runtime-C0FnF6B9.js";import{n as t,r as n,s as r,t as i}from"./createLucideIcon-CIaDJQzH.js";import{J as a,K as o,et as s}from"./index-BmMJYhTR.js";var c=i(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),l=i(`sparkles`,[[`path`,{d:`M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,key:`1s2grr`}],[`path`,{d:`M20 2v4`,key:`1rf3ol`}],[`path`,{d:`M22 4h-4`,key:`gwowj6`}],[`circle`,{cx:`4`,cy:`20`,r:`2`,key:`6kqj1y`}]]),u=e(r(),1),d=`You are a recipe form-filling assistant. I will paste a recipe (from a site, video, image OCR, or notes). Extract every detail and map it to the EXACT fields of my recipe form below. Never invent missing values; leave them blank or at their defaults. Preserve the original wording/language except where a rule below says to split or clean it.

FORM LAYOUT (order and exact labels):
1. Basic Information
   - "Recipe Name *" — text, required
   - "Category" — dropdown only: Chicken | Beef | Pork | Seafood | Vegetables | Rice | Noodles / Pasta | Breakfast | Soup | Dessert | Drinks | Other
   - "Short Description" — textarea
   - "Recipe Photo" — fill only with an explicit image URL; otherwise leave blank

2. Cooking Information
   - "Prep Time (min)" — number in MINUTES
   - "Cook Time (min)" — number in MINUTES
   - "Servings" — number
   - "Difficulty" — exactly Easy | Medium | Hard

3. Ingredients — MOST IMPORTANT SECTION
   Repeatable rows. For EVERY ingredient line fill:
   - "Quantity" (text): "2", "1/2", "1 1/2", "250". Blank if no amount.
   - "Unit" (text): "cup", "tbsp", "tsp", "g", "kg", "oz", "lb", "ml", "clove", "can", "slice", "pinch". Blank if no unit.
   - "Ingredient name" (text): the food/item only, with any useful prep note kept in the name.
   - "Optional" (checkbox): TRUE only if the text says optional / "for garnish" / "if desired". Otherwise FALSE.
   - Purchase sub-fields, ONLY if a price is actually stated: "Bought", "Price paid..." (pesos), "for", "Quantity bought...", "Unit bought...". Never estimate prices.
   Use "Add Ingredient" for each additional row; move up/down and "Remove ingredient" exist for ordering.

4. Cooking Instructions
   Repeatable "Step N" textareas. One distinct action per step, in original order. Strip leading numbers/"Step 1", but KEEP times, temperatures, and pan/technique details inside the step text. Use "Add Step" for more rows.

5. Personal Notes
   Textarea for tips, substitutions, storage, make-ahead, author notes, and warnings. Blank if none.

INGREDIENT SPLITTING RULES (follow exactly):
- "2 cups all-purpose flour" -> Quantity "2" | Unit "cups" | Name "all-purpose flour"
- "1/2 tsp fine salt" -> "1/2" | "tsp" | "fine salt"
- "1 1/2 tbsp olive oil" -> "1 1/2" | "tbsp" | "olive oil"
- "3 cloves garlic, minced" -> "3" | "cloves" | "garlic, minced"
- "1 can (14 oz) diced tomatoes, optional" -> "1" | "can" | "diced tomatoes (14 oz)" | Optional true
- "Salt to taste" -> "" | "" | "Salt to taste" (do NOT put "to taste" in Quantity)
- "Fresh cilantro for garnish" -> "" | "" | "Fresh cilantro for garnish"
- Never put the quantity or unit into "Ingredient name" if a separate slot exists.
- Do not merge multiple ingredients into one row. One source line = one row, unless the line clearly lists separate items.
- Keep fractions and mixed numbers as written. Convert only whole hours to minutes for TIME fields.

OTHER RULES:
- Prep/cook times: convert hours to minutes ("1 hr 30 min" = 90). Ranges -> use the first number. "Overnight"/"until golden" are not numeric; put them in the relevant step or Notes, leave the time field 0.
- If only a total time is given, set Prep Time 0 and Cook Time to that total.
- Servings: from "serves 4", "4 servings", "makes 12". If unstated, use 4.
- Difficulty: infer from method/time; if unclear, use Medium.
- Category: choose the closest from the allowed list only; if none fits, use Other.
- Description: use the recipe's summary sentence if present; otherwise blank.
- Photo: blank unless a direct image URL is in the text.
- Do NOT output id, totalTime, favorite, createdAt, or updatedAt — the app generates those.

IF YOU CAN INTERACT WITH MY FORM:
- Open "Add New Recipe".
- If "Add Recipe with Text" is visible, paste the raw recipe there and click "Fill form from text", then AUDIT and fix every field with the rules above — ingredients first.
- Otherwise fill manually using the exact labels above, clicking "Add Ingredient"/"Add Step" as needed.
- Do NOT click "Save Recipe"/"Save Changes" unless I explicitly ask.

IF YOU CANNOT INTERACT WITH THE FORM:
Reply with ONLY this JSON object — no prose, no markdown fences:

{
  "name": "",
  "category": "Other",
  "description": "",
  "photo": "",
  "prepTime": 0,
  "cookTime": 0,
  "servings": 4,
  "difficulty": "Medium",
  "ingredients": [
    {
      "quantity": "",
      "unit": "",
      "name": "",
      "optional": false,
      "purchasePrice": null,
      "purchaseQuantity": null,
      "purchaseUnit": ""
    }
  ],
  "instructions": [],
  "notes": ""
}

null in purchase fields means "not stated — leave blank". Omit nothing else. This reply is pasted into my app's "Add Recipe with Text" box, so keep the keys exactly as written.

Now wait for my pasted recipe and process it.`;async function f(e){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{return!1}let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.top=`-1000px`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand(`copy`)}catch{n=!1}return t.remove(),n}var p=n(),m=[`Copy the prompt below.`,`Paste it into any AI chat, then paste your recipe underneath it.`,`Paste the AI reply into “Add Recipe with Text” and choose “Fill form from text”.`];function h(){let e=(0,u.useId)(),[n,r]=(0,u.useState)(!1);return(0,p.jsxs)(`section`,{"aria-labelledby":`${e}-title`,className:`bg-card border border-border rounded-2xl p-4 sm:p-6 space-y-4 w-full min-w-0`,children:[(0,p.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-start justify-between gap-3`,children:[(0,p.jsxs)(`div`,{className:`flex items-start gap-3 min-w-0`,children:[(0,p.jsx)(`div`,{className:`w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0`,children:(0,p.jsx)(l,{className:`w-5 h-5`})}),(0,p.jsxs)(`div`,{className:`min-w-0`,children:[(0,p.jsx)(`h2`,{id:`${e}-title`,className:`font-serif font-bold text-base text-foreground`,children:`AI Recipe Prompt`}),(0,p.jsx)(`p`,{className:`text-xs text-muted-foreground mt-0.5`,children:`Teach any AI chat the fields Neja uses. Its reply drops straight into the right places, especially quantity, unit, and ingredient name.`})]})]}),(0,p.jsxs)(t,{variant:`secondary`,className:`w-full sm:w-auto shrink-0`,onClick:async()=>{if(!await f(d)){s.error(`Could not copy. Open the prompt and select the text instead.`);return}r(!0),s.success(`AI recipe prompt copied.`),window.setTimeout(()=>r(!1),2e3)},children:[n?(0,p.jsx)(a,{className:`w-3.5 h-3.5`}):(0,p.jsx)(c,{className:`w-3.5 h-3.5`}),n?`Copied`:`Copy prompt`]})]}),(0,p.jsx)(`ol`,{className:`space-y-2`,children:m.map((e,t)=>(0,p.jsxs)(`li`,{className:`flex items-start gap-3 text-xs text-stone-600 dark:text-stone-400`,children:[(0,p.jsxs)(`span`,{className:`font-serif font-extrabold text-amber-700 dark:text-amber-400 tabular-nums`,children:[t+1,`.`]}),(0,p.jsx)(`span`,{className:`min-w-0 leading-relaxed`,children:e})]},e))}),(0,p.jsxs)(`details`,{className:`group rounded-xl border border-border overflow-hidden`,children:[(0,p.jsxs)(`summary`,{className:`min-h-11 flex items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-xs font-semibold text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50`,children:[`View the prompt`,(0,p.jsx)(o,{className:`w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180`})]}),(0,p.jsx)(`pre`,{className:`max-h-72 overflow-auto whitespace-pre-wrap break-words border-t border-border bg-stone-50 dark:bg-stone-800/40 p-3.5 font-mono text-xs leading-relaxed text-stone-700 dark:text-stone-300`,children:d})]})]})}export{h as AiRecipePromptSection};
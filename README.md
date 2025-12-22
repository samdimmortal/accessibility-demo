# MoodSense – Accessibility Demonstration

MoodSense is an interactive web project designed to demonstrate the **difference between visual and non-visual experiences** on the web. It highlights accessibility principles and WCAG 2.1 compliance for blind and sighted users.

---

## 🎯 Project Goals

- Show how a web page can be **functional for screen readers** even if visually blank.
- Demonstrate **blind mode vs visual mode** toggling.
- Include a **guided accessibility tour** using Shepherd.js.
- Provide a live example of **ARIA live announcements**.
- Serve as a reference for **WCAG 2.1 guidelines** in practice.

---

## ⚡ Features

1. **Blind Mode (Default)**
   - Page loads visually blank (black screen).
   - All interactive elements (inputs, buttons) are **accessible to screen readers**.
   - ARIA live regions announce dynamic actions.
   - Shepherd tour can be triggered in both modes.

2. **Visual Mode**
   - Toggle using the switch in the bottom control panel.
   - Restores colors, inputs, and buttons for sighted users.
   - Google search input becomes functional:
     - Enter a search query and press Enter or click the arrow button.
     - Opens Google search in a **new tab**.
     - ARIA live region announces: *“Opening Google search in a new tab.”*

3. **Accessibility Tour**
   - Triggered via the **Tour button** in the navigation menu.
   - Guided steps explain the visual vs non-visual experience.
   - Implemented using [Shepherd.js](https://shepherdjs.dev/).

---

## 🗂 Folder Structure

project-root/
├── index.html
├── src/
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ └── main.js
│ └── images/
│ └── (your images here)
├── README.md

- CSS, JS, and images are **separated for easy modification**.
- No npm runtime dependencies are required; all libraries are loaded via CDN.
- `node_modules/` and `package-lock.json` can be removed if desired.

---

## 📝 WCAG 2.1 Compliance

| Feature | WCAG Guideline Reference |
|---------|--------------------------|
| Hidden visual content but screen reader accessible | 1.3.1 Info & Relationships |
| Keyboard toggle & input accessibility | 2.1.1 Keyboard |
| ARIA live announcements | 4.1.2 Name, Role, Value |
| Optional visual interface | 1.4.13 Content on Hover or Focus |
| Shepherd tour contrast | 1.4.3 Contrast (Minimum) |

All accessibility considerations are annotated inline in the HTML, CSS, and JS files.

---

## ⚙️ Usage Instructions

1. Clone or download the repository.
2. Open `index.html` in a browser (Chrome, Firefox, or Edge recommended).
3. **Default load** is blind mode (black screen).
4. Toggle visual mode using the switch at the bottom.
5. Type in the search input and press **Enter** or click the arrow to open Google search.
6. Trigger the **Tour** from the navigation menu for a guided walkthrough.

---

## 🔧 Customization

- Replace images in `src/images/`.
- Modify text or colors in `src/css/styles.css`.
- Update Shepherd tour steps in `src/js/main.js`.

---

## 📚 References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
- [Shepherd.js Documentation](https://shepherdjs.dev/)

---

## 👀 Demo

![Blind mode screenshot](src/images/hero.jpg)  
*Visual representation for sighted users; screen readers still read content in blind mode.*

---

## 📝 Notes

- This project demonstrates accessibility best practices for **educational purposes**.
- Designed for **blind vs sighted experience comparison**.
- Works fully offline; only Shepherd.js and Tailwind CSS require internet access via CDN.

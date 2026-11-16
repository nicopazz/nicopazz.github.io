---
name: Nicolás Paz Portfolio
description: Dark personal portfolio with restrained blue and violet accents.
colors:
  bg-main: "#0a0a12"
  bg-secondary: "#11111a"
  bg-raised: "#171722"
  text-primary: "#f4f5fa"
  text-secondary: "#b2b5c4"
  text-muted: "#969aae"
  link-color: "#a8c8ff"
  border: "#2a2b3a"
  focus: "#c4b5fd"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.7rem, 5.5vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.65rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.7
rounded:
  tag: "5px"
  field: "8px"
  button: "9px"
  inset: "10px"
  card: "14px"
  portrait: "18px"
spacing:
  small: "8px"
  control-gap: "12px"
  inset: "24px"
  group: "32px"
  heading-gap: "40px"
components:
  button-secondary:
    textColor: "{colors.text-primary}"
    rounded: "{rounded.button}"
    padding: "12px 21px"
  input:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.field}"
    padding: "12px 15px"
  card:
    backgroundColor: "{colors.bg-secondary}"
    rounded: "{rounded.card}"
---

# Design System: Nicolás Paz Portfolio

## Overview

This documents the implemented visual system in `style.css` and the semantic patterns in `index.html`. Preserve the dark identity, Poppins typography, restrained blue/violet gradients and clear project hierarchy. The code is the implementation authority; this is a source-based record, not a claim of browser verification.

## Colors

Blue and violet identify the name and primary actions. The name uses `linear-gradient(120deg, #88b4ff, #b79aff)`; primary buttons use `linear-gradient(120deg, #2456b5, #673db2)`. Keep gradients concentrated in these existing roles. Main, secondary and raised neutrals separate the page, sections and small tags. Primary text carries headings; secondary text carries prose; muted text carries metadata. Pale blue links remain distinguishable from body copy.

## Typography

Poppins with a sans-serif fallback serves all roles. The display token describes the hero name; its introductory line is smaller and lighter. Section headlines use the headline token. Standard titles use (1.2rem), weight (600), and line height (1.2). Hero prose is limited to (64ch) with generous line spacing. Project metadata and tags remain subordinate to titles and descriptions.

## Layout

The centered container caps at (1180px), with desktop gutters of (32px) per side. Sections use `clamp(64px, 7.5vw, 112px)` vertical padding. The homepage has two full-width featured projects with image/content columns, followed by three secondary projects. Experience uses compact divided rows; skills use category-and-tag rows. Case studies share the palette and use a reading column plus facts panel.

At (968px), gutters become (24px), the JavaScript-enabled navigation collapses, and secondary projects use two columns with the last card spanning the row. At (800px), hero, featured projects, experience, contact and case-study columns stack. At (600px), gutters become (16px), sections use (60px) padding, and secondary projects, skills and education become single-column. Header height changes from (76px) to (68px).

## Elevation & Depth

Depth comes from tonal surfaces and fine borders, without box shadows. A subtle radial wash sits behind the hero. Project cards change border color on hover and focus within; they do not need extra visual lift.

## Shapes

Use the frontmatter corner scale: gently rounded controls, moderately rounded cards and a softer portrait. Project imagery is clipped by its container. Featured screenshots use contain sizing; secondary thumbnails use cover sizing with top alignment.

## Components

- Buttons: minimum height (48px), compact Poppins labels, gradient primary and transparent outlined secondary variants. Primary hover darkens the gradient; secondary hover changes border and fill. A slight upward hover movement is enabled only when reduced motion is not requested.
- Navigation: sticky, opaque-dark header with a subtle bottom border; links and menu control have minimum (44px) targets. Keep the real button, expanded state, controlled-menu association, keyboard handling and hidden-menu focus management. Links remain available when JavaScript is absent.
- Project cards: semantic articles with separate headings, images, technology lists and explicit links. Technology tags are descriptive list items, not interactive filters.
- Experience and skills: preserve compact rows and separators; skills have no proficiency meters.
- Forms: visible associated labels, native required/type/length validation, helper text and a live status region. Inputs remain at (1rem); textarea resizing stays vertical. Keep a clear disabled submission state.
- Focus and motion: retain a visible (3px) focus outline with (5px) offset. State transitions are short (180–200ms). Reduced-motion mode removes these transitions and smooth scrolling; forced-colors mode restores solid name text and button boundaries.

## Do's and Don'ts

- Do reuse the shared stylesheet and semantic heading, list, link and form patterns.
- Do preserve the name gradient, dark surfaces and restrained accent use.
- Do keep real project imagery readable and content responsive at all three breakpoints.
- Don't turn descriptive skill tags into buttons or invent skill ratings.
- Don't hide keyboard focus, rely on animation for meaning, or invent portfolio claims.

# Jade & Ember: dining scene (generated concept imagery)

AI-generated concept art for the fictional restaurant "Jade & Ember". The people and the restaurant are not real. Generated 2026-10-19 with Google `gemini-3.1-flash-image` through the Gemini API (`generateContent`). Approval and scope are recorded in `docs/JADE_AND_EMBER_APPROVALS.md` in `getsimplifiedtech/STS-Cinematic-Showcase.` (APR-JE-017 to APR-JE-022).

**Scope of use:** approved for this specific scene only. This does not authorise generated imagery of people, or any other generated imagery, elsewhere. Client use is not approved. Replace with real photography for a real client.

## Files (never overwrite the two originals)

| File | Role | Size | SHA-256 |
|---|---|---|---|
| `jade-ember_dining-scene_2k_visual-reference_original_2026-10-19.jpg` | **Approved visual reference.** Unmodified API output, 2752 × 1536, JPEG | 2,389,359 B | `8fd9178b53566d0182f59d7fbebe066eb46a958ff7103d887a376f537f7d23e0` |
| `jade-ember_dining-scene_4k_master-candidate_original_2026-10-19.jpg` | **Master candidate.** Unmodified API output, 5504 × 3072, JPEG | 6,959,214 B | `d4d7435ccc587bb61a6ddba7b87d44c1c77e0aa8876305fc13b0768adeded277` |
| `jade-ember_dining-scene_4k_color-matched_derivative_2026-10-19.jpg` | Derivative of the 4K original, colour-matched to the 2K reference. Re-encoded JPEG q95, 4:4:4, 5504 × 3072 | 3,599,010 B | `b589bdfbe2dcc5332e68a6902f2d6cce47a55a3abed915c91bde58a3d8d800da` |

## Generation calls (two image generations, no retries)

| | 2K reference | 4K pass |
|---|---|---|
| Model | `gemini-3.1-flash-image` | `gemini-3.1-flash-image` |
| Config | 16:9, `imageSize: "2K"`, image-only response | 16:9, `imageSize: "4K"`, image-only response |
| Inputs | Prompt A + `hero-wok.webp` (approved still, style reference only) | Prompt B + the approved 2K JPEG as an editing reference |
| Usage | 807 prompt (549 text, 258 image), 1,680 image out, 3,006 total | 527 prompt (269 text, 258 image), 2,520 image out, 3,393 total |
| Tier | standard | standard |

Cost was not verified (the pricing page was unreachable from the generation environment). Check Google AI Studio or Cloud billing for the two calls.

## Colour-matched derivative

The 4K original drifted from the approved grade: lifted shadows, lower contrast, cooler and slightly pinker (mean RGB 44.3, 37.1, 34.4 against 39.7, 37.5, 29.6 in the 2K). Method: the 4K was downsized to 2752 × 1536, per-channel histogram matching against the 2K produced a lightly smoothed 256-entry lookup table per channel, and the table was applied to the full-size 4K. No other edit, no sharpening, no resampling of the 4K. After matching, the mean colour difference against the 2K (CIE Lab Delta E, both blurred to remove detail differences) fell from 3.9 (95th percentile 5.3) to 0.86 (95th percentile 1.8), and the mean RGB is 39.8, 37.5, 29.6.

## Known observations (visual check, not a QA sign-off)
- Composition, people, wardrobe, expressions and objects in the 4K match the 2K.
- Detail gain in the 4K is modest: hair strands and facial lines are crisper; the man's hand and forearm are slightly softer than in the 2K.
- A pale ring-like band where the ladle handle meets the man's thumb appears in the 4K and not in the 2K. Check at 100% before using the image.
- No text, logos or overlays seen.

## Prompts

### Prompt A (2K reference)
```
Create one photorealistic, high-end editorial restaurant photograph for "Jade & Ember", a fictional modern Chinese kitchen. 16:9 landscape, shot like a magazine feature on a full-frame camera with a 35mm lens at f/2, natural film-like colour, fine grain, true-to-life skin texture and fabric detail.

The attached image is a style and colour reference only: take its mood, its warm ember firelight against cool jade-tinted shadows, and its low-key restaurant-kitchen atmosphere. Do not copy its wok, composition or food.

Scene: an intimate late-evening dining room. Three people share a low, dark-lacquered table in the right two-thirds of the frame. The left third is calm, dark, out-of-focus space (deep jade-lacquer wall panelling fading to shadow), left clear for later typography.
- An older woman with cropped silver hair, in an indigo-dyed linen jacket with a high collar and a thin silver bangle, is mid-laugh, head tilted, one hand lifting a pale celadon bowl of mapo tofu.
- Beside her, a broad-shouldered man in his thirties, in a rust-coloured waxed-cotton overshirt with sleeves pushed to the elbow and tortoiseshell glasses, is concentrating with a small smile as he serves from a shared dish with a ladle.
- Across from them, a younger woman with a sharp black bob, in a charcoal wool turtleneck and a single small jade pendant, holds a glazed slice of char siu in chopsticks and gives the others an amused sideways look.
Each person has a clearly different face, age, build and expression. Natural human anatomy: correct hands with five fingers, chopsticks held properly, believable proportions, eyes aligned and looking at something real.

Table: matte black plates, celadon-green bowls, steaming dishes, small ceramic cups of tea. Nothing else crowding the table.

Light: one warm directional ember-orange glow from an open wok kitchen out of focus in the far background (a cook silhouetted at a flaring burner, soft steam), raking across faces and bowls, with cool jade-green ambient fill in the shadows. Believable falloff, subtle specular highlights on the lacquer, no blown highlights.

Palette: charcoal, jade, warm ember, rice-white tones only.

Do not include: any text, lettering, signage, menus, logos, watermarks, decorative overlays or borders; any additional diners or crowd (the background has at most the one silhouetted cook and a blurred server); candles; plastic-looking skin; duplicated or fused limbs.
```

### Prompt B (4K edit pass)
```
Edit the attached photograph into a 4K version of the same image. This is an upscale-and-refine pass, not a re-imagining: reproduce the exact same photograph.

Preserve exactly:
- The composition, framing, camera angle and crop; the dark jade-lacquer negative space across the left third.
- The same three diners and the same background cook silhouetted at the flaring wok. Keep every face, age, hairstyle, expression, pose, hand position, wardrobe (indigo jacket with silver bangle, rust overshirt and tortoiseshell glasses, charcoal turtleneck with jade pendant), table, bowls, dishes and chopsticks exactly where they are.
- The lighting, colour grade and mood: warm ember firelight against cool jade-green shadows, charcoal, jade, ember and rice-white tones.

Improve only fine detail, with natural photographic realism: true skin texture and pores without smoothing, individual hair strands, fabric weave and stitching, clean correctly formed fingers and hands, food texture and glaze, steam, and the crisp specular highlights on ceramic, tea cups and lacquer. Keep natural film-like grain; no artificial sharpening halos, no plastic smoothing, no HDR look.

Do not add or remove any person or object. No text, lettering, logos, watermarks or overlays.
```

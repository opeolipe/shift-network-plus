# ScoutQA End-to-End (E2E) Tactical Testing Specification

This blueprint guides automated or manual testers through a complete verification of all functional modules, UI layout metrics, state stability, and accessibility boundaries of the CompTIA Network+ (N10-009) Prep App.

---

## SECTION 1: CORE APPLICATION VIEWS & NAVIGATION

### Test Scenario 1.1: Home View Initial Load
1.  **Access:** Load the application in the simulated browser panel.
2.  **Verify Layout Elements:**
    *   Confirm presence of main title: "N10-009 Shift" with high-contrast elegant typography.
    *   Verify primary interactive cards are visible and active: "Drill Simulator", "PBQ Lab", "Stats Center", and "Reference Deck".
    *   Ensure the "Anti-Fluff" visual reference switch is displayed on the landing page with high-contrast slate colors.
3.  **Validate Responsive Grid:** Scale view down to mobile widths (320px - 414px) and verify the bento grid scales into a single fluid column without label truncation, margin crowding, or horizontal overflows.

### Test Scenario 1.2: Navigating Between Views
1.  **Interaction:** Click each of the key action cards sequentially.
2.  **Verification Routine:**
    *   Click "Drill Simulator" -> Confirm view state shifts, animates smoothly, and displays the first question.
    *   Click back header ("Return Home") -> Verify landing view resets without retaining unresolved states.
    *   Click "PBQ Lab" -> Confirm introduction page loads with "10 Interactive Simulations" status card.
    *   Click back button -> Verify successful reset.
    *   Click "Reference Deck" -> Check that study guides and cheat sheets open cleanly.
    *   Click "Anti-Fluff" toggle -> Verify state toggles with clear mechanical slide animation and zero layout shifts.

---

## SECTION 2: DRILL & EXAM SIMULATION ENGINES

### Test Scenario 2.1: Multiple-Choice Questions (Single / Multi-Select)
1.  **Selection Flow:** Navigate to "Drill Simulator".
2.  **Perform Interaction:**
    *   *Single-Select Quality:* Click an option. Verify immediate choice highlighting (border/color shift) and display of "Review Answer" or instant feedback.
    *   *Multi-Select Quality:* For questions requiring multiple correct keys, verify selecting one does not submit instantly. Multiple items can be ticked, and the "Finalize Bundle" button remains disabled until at least one selection is active. Clicking "Finalize Bundle" submits the set.
3.  **Verify Transition Safety:** Click "Advance Next". Ensure that question states, selection arrays, previous answers, and feedback blocks are fully wiped from memory before rendering the new question card.

### Test Scenario 2.2: Terminal Command-Line (CLI) Simulations
1.  **Selection Flow:** Open a question designated as CLI format.
2.  **Verify Terminal Input Mechanics:**
    *   Ensure input field accepts text.
    *   Confirm suggestible auto-fill buttons (suggested command keywords) are visible below the input box.
    *   Click a suggestible button (e.g. `ping`) -> Verify it inserts the keyword directly into the active cursor position.
    *   Type a valid command (e.g., `arp -a`) -> Click "Execute Response" or press Enter.
    *   Verify the response feedback screen prints terminal output in authentic JetBrains Mono monospaced styling.

---

## SECTION 3: PBQ LAB SIMULATOR (10 Interactive Simulations)

This is the most critical module. The tester must verify that each of the interactive labs runs dynamically without broken states.

### Test Scenario 3.1: Switch Configuration Lab
1.  **Verify UI Layout:** Open the first simulation in the PBQ Lab.
2.  **Action Flow:**
    *   Click interactive ports on the graphical switch interface.
    *   Change assigned VLAN states in the configuration drop-downs.
    *   Type command parameters or set options.
3.  **Outcome Check:** Click "Validate Configuration". Verify that individual success conditions are calculated and detailed feedback logs are displayed. Confirm XP points are allocated to the master total pool.

### Test Scenario 3.2: Modern Concept Application & Subnetting Labs
1.  **Verify Subnet Calculations:** Solve a subnetting calculation drill within the designated timer limit.
    *   Type numerical responses (subnet boundaries, usable host arrays).
    *   Verify correct inputs highlight as green, and incorrect selections load remediation logs.
2.  **Verify Drag-and-drop Visualizers:** Coordinate mappings for OSPF or SD-WAN path routing simulations.
    *   Verify connections can be chosen or items matching connectors can be paired.
    *   Validate that resizing container viewholders doesn't break canvas calculations or absolute coordinate offsets.

---

## SECTION 4: MOBILE ACCESSIBILITY & LAYOUT BOUNDARIES (Touch Target Guard)

### Test Scenario 4.1: Touch Hit-box Targets (Min Height 44px)
1.  **Verification Target:** Identify the small toggle switches, back arrows, and close buttons across the app.
2.  **Touch Bound Audit:**
    *   *CompTIA Vision Switch:* Verify that the target element click bounds have a minimum height of `44px` (matching `h-11` or `min-h-[44px]`). Despite the visual track being a thin `24px` toggle, user tap/click triggers must successfully activate on the larger padding boundaries.
    *   *Close Buttons:* Verify that corner close buttons or "X" elements have a clickable padding boundary of at least `44px` to prevent missed taps.

### Test Scenario 4.2: Text Overlay & Margin Safety
1.  **Verification viewport metrics:** Screen sizes: 320px (iPhone SE), 360px (Galaxy S), 768px (iPad Air).
2.  **Check for Layout Drift:**
    *   Verify no text overlaps occur between absolute overlays (e.g., toast alerts or feedback popups) and static headers.
    *   Ensure buttons do not drop off the bottom of the visible screen without scroll containment, especially when custom system fonts or raised zoom levels are applied.
    *   All modal sheets, background backdrops, and interactive panels must align exactly over the parent layout without offset leaks.

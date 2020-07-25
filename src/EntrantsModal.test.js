import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EntrantsModal from "./EntrantsModal";
import { injectFixtures } from "race-fix";
import { Event as CycleEvent } from "race-lib";
import { User } from "race-lib";

beforeAll(() => {
  injectFixtures(CycleEvent);
});

beforeEach(async () => {
  render(<EntrantsModal />);
  window.dispatchEvent(new CustomEvent("entrants", { detail: 123 }));
  await screen.findByText(/Stuart Turvey Memorial 10-mile TT/i);
});

test("renders entrants buttons", async () => {
  const linkElement = await screen.findByText(
    /Stuart Turvey Memorial 10-mile TT/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("renders entrants ordered by rank", async () => {
  fireEvent.click(screen.getByTestId("race-link-597786"));
  await screen.findByText(/National Rank/i);
  expect(screen.getByTestId("user-detail-0-regional-points").textContent).toBe(
    "705"
  );
  expect(screen.getByTestId("user-detail-1-regional-points").textContent).toBe(
    "893"
  );
});

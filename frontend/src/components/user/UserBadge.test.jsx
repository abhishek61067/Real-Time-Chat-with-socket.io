import { render, screen, fireEvent } from "@testing-library/react";
import UserBadge from "./UserBadge";
import { vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";

describe("UserBadge", () => {
  const user = { _id: "123", name: "Test User" };

  function renderWithChakra(ui) {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
  }

  it("renders the user's name", () => {
    renderWithChakra(<UserBadge user={user} handleFunction={() => {}} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("calls handleFunction with user when close icon is clicked", () => {
    const handleFunction = vi.fn();
    renderWithChakra(<UserBadge user={user} handleFunction={handleFunction} />);
    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);
    expect(handleFunction).toHaveBeenCalledWith(user);
  });
});

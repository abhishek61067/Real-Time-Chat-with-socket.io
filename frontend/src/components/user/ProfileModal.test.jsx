import { render, screen, fireEvent } from "@testing-library/react";
import ProfileModal from "./ProfileModal";
import { ChakraProvider } from "@chakra-ui/react";
import { vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { waitForElementToBeRemoved } from "@testing-library/react";

const user = {
  name: "Test User",
  email: "test@example.com",
  pic: "https://example.com/avatar.jpg",
};

function renderWithChakra(ui) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe("ProfileModal", () => {
  it("renders 'My Profile' button when displayText is true", () => {
    renderWithChakra(<ProfileModal user={user} displayText={true} />);
    expect(screen.getByText("My Profile")).toBeInTheDocument();
  });

  it("renders eye icon button when displayText is false", () => {
    renderWithChakra(<ProfileModal user={user} displayText={false} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens modal and displays user info when 'My Profile' is clicked", () => {
    renderWithChakra(<ProfileModal user={user} displayText={true} />);
    fireEvent.click(screen.getByText("My Profile"));
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
    expect(screen.getByAltText(user.name)).toBeInTheDocument();
  });

  it("opens modal when eye icon button is clicked", () => {
    renderWithChakra(<ProfileModal user={user} displayText={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("closes modal when either Close button in footer or close icon in header is clicked", async () => {
    renderWithChakra(<ProfileModal user={user} displayText={true} />);
    fireEvent.click(screen.getByText("My Profile"));

    // Get all close buttons (icon and footer)
    let closeButtons = screen.getAllByRole("button", { name: /close/i });

    // Click the close icon (header)
    fireEvent.click(closeButtons[0]);
    await waitForElementToBeRemoved(() => screen.queryByText(user.name));

    // Re-open the modal
    fireEvent.click(screen.getByText("My Profile"));

    // Re-query close buttons for the new modal instance
    closeButtons = screen.getAllByRole("button", { name: /close/i });

    // Click the footer Close button
    fireEvent.click(closeButtons[1]);
    await waitForElementToBeRemoved(() => screen.queryByText(user.name));
  });
});

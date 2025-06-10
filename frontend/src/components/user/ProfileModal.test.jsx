import { render, screen, fireEvent } from "@testing-library/react";
import ProfileModal from "./ProfileModal";
import { ChakraProvider } from "@chakra-ui/react";
import { vi } from "vitest";
import { waitFor } from "@testing-library/react";

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
  it("closes modal when Close button is clicked", async () => {
    renderWithChakra(<ProfileModal user={user} displayText={true} />);
    fireEvent.click(screen.getByText("My Profile"));
    const closeButtons = screen.getAllByRole("button", { name: /close/i });
    fireEvent.click(closeButtons[1]); // Click the footer Close button

    await waitFor(() => {
      expect(screen.queryByText(user.name)).not.toBeInTheDocument();
    });
  });
});

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { OrganizationMembership } from "@clerk/nextjs/server";

// Helper function to check if the user is an admin
const isAdmin = async (userId: string) => {
  const clerk = await clerkClient();
  const memberships = await clerk.users.getOrganizationMembershipList({
    userId,
  });

  const orgSlug = process.env.CLERK_ORG_SLUG;  // Get slug from .env

  return memberships.data.some(
    (membership: OrganizationMembership) =>
      membership.organization.slug === orgSlug &&  // Check slug from .env
      (membership.role === "admin" || membership.role === "owner")
  );
};

// PATCH method for updating the house status (Admin Only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { houseId: string } }
) {
  try {
    const { houseId } = params;
    const { userId } = await auth(); // Get userId from Clerk authentication

    if (!userId) {
      console.error("Unauthorized: No userId found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userIsAdmin = await isAdmin(userId); // Check if the user is an admin
    if (!userIsAdmin) {
      console.error("Unauthorized: User is not an admin");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { status } = await req.json(); // Get new status from request body

    const updatedHouse = await db.house.update({
      where: {
        id: houseId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedHouse);
  } catch (error) {
    console.error("[PATCH_HOUSE_ADMIN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

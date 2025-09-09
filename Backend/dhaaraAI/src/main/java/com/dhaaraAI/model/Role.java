package com.dhaaraAI.model;

public enum Role {
    ROLE_ADMIN,
    ROLE_LAWYER,
    ROLE_CLIENT;

    // Optional: return a cleaner name without the ROLE_ prefix
    public String getDisplayName() {
        return this.name().replace("ROLE_", "");
    }
}

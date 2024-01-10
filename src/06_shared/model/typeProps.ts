import React from "react";

export type HeaderButtonProps = {
    icon: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
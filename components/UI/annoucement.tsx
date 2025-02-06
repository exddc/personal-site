import React from "react";
import { Badge, type BadgeProps } from "./badge";
import { cn } from "@/lib/utils";
import { type HTMLAttributes, createContext, useContext } from "react";

type BadgeContextType = {
  themed: boolean;
};

const BadgeContext = createContext<BadgeContextType>({
  themed: false,
});

const useBadgeContext = () => {
  const context = useContext(BadgeContext);

  if (!context) {
    throw new Error("useBadgeContext must be used within a Badge");
  }

  return context;
};

export type AnnouncementProps = BadgeProps & {
  themed?: boolean;
};

export const Announcement = ({
  variant = "outline",
  themed = false,
  className,
  ...props
}: AnnouncementProps) => (
  <BadgeContext.Provider value={{ themed }}>
    <Badge
      variant={variant}
      className={cn(
        "max-w-full cursor-pointer gap-2 rounded-full bg-white px-3 py-0.5 font-medium shadow-sm transition-all hover:mx-2 hover:scale-[103%] hover:shadow-md",
        "hover:shadow-md",
        themed && "border-foreground/5",
        className,
      )}
      {...props}
    />
  </BadgeContext.Provider>
);

export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTag = ({
  className,
  ...props
}: AnnouncementTagProps) => {
  const { themed } = useBadgeContext();

  return (
    <div
      className={cn(
        "bg-foreground/5 -ml-2.5 shrink-0 truncate rounded-full px-2.5 py-1 text-xs",
        themed && "bg-background/60",
        className,
      )}
      {...props}
    />
  );
};

export type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTitle = ({
  className,
  ...props
}: AnnouncementTitleProps) => (
  <div
    className={cn(
      "font-regular mx-auto flex items-center gap-1 truncate text-sm",
      className,
    )}
    {...props}
  />
);

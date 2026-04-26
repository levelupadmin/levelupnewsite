import type { ComponentProps, ReactNode } from "react";
import { useEffect, useState } from "react";

export interface LinkProps extends Omit<ComponentProps<"a">, "href"> {
  to: string;
  replace?: boolean;
  state?: unknown;
}

export function Link({ to, replace, state, children, ...rest }: LinkProps) {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}

export interface NavLinkProps extends Omit<ComponentProps<"a">, "className" | "href"> {
  to: string;
  end?: boolean;
  className?:
    | string
    | ((state: { isActive: boolean; isPending: boolean }) => string | undefined);
  children?:
    | ReactNode
    | ((state: { isActive: boolean; isPending: boolean }) => ReactNode);
}

export function NavLink({
  to,
  end,
  className,
  children,
  ...rest
}: NavLinkProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    setIsActive(end ? path === to : path.startsWith(to));
  }, [to, end]);

  const state = { isActive, isPending: false };
  const cls =
    typeof className === "function" ? className(state) : className;
  const kids = typeof children === "function" ? children(state) : children;

  return (
    <a href={to} className={cls} {...rest}>
      {kids}
    </a>
  );
}

export interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

export function useLocation(): Location {
  const [loc, setLoc] = useState<Location>(() => ({
    pathname: typeof window !== "undefined" ? window.location.pathname : "/",
    search: typeof window !== "undefined" ? window.location.search : "",
    hash: typeof window !== "undefined" ? window.location.hash : "",
    state: null,
    key: "default",
  }));

  useEffect(() => {
    const update = () =>
      setLoc({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        state: null,
        key: String(Date.now()),
      });
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return loc;
}

export function useParams<T extends Record<string, string | undefined>>(): T {
  if (typeof window === "undefined") return {} as T;
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);
  const params: Record<string, string> = {};
  if (segments[0] === "student-stories" && segments[1]) {
    params.slug = segments[1];
  } else if (segments[0] === "masterclass" && segments[1]) {
    params.slug = segments[1];
  }
  return params as T;
}

export function useNavigate() {
  return (to: string) => {
    if (typeof window !== "undefined") {
      window.location.href = to;
    }
  };
}

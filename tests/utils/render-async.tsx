import { render, type RenderResult } from "@testing-library/react";
import {
	type ReactElement,
	type ReactNode,
	isValidElement,
	cloneElement,
	Children,
} from "react";

/**
 * Check if a function is async
 * @param fn - Function to check
 * @returns True if the function is async
 */
function isAsyncFunction(fn: unknown): boolean {
	return fn?.constructor?.name === "AsyncFunction";
}

/**
 * Recursively resolve all async server components in a React element tree
 * @param element - React element that may contain async server components
 * @returns Resolved React element with all async components awaited
 */
async function resolveAsyncComponents(element: ReactNode): Promise<ReactNode> {
	// Handle null/undefined/primitives
	if (!isValidElement(element)) {
		return element;
	}

	const elementType = element.type;

	// If it's an async function component (Server Component), await it
	if (typeof elementType === "function" && isAsyncFunction(elementType)) {
		// Await the async component to get its rendered output
		const result = await (elementType as (props: unknown) => Promise<ReactNode>)(
			element.props,
		);
		// Recursively resolve the result (it may contain more async components)
		return resolveAsyncComponents(result);
	}

	// If it's a regular function component, call it and resolve its children
	if (typeof elementType === "function" && !isAsyncFunction(elementType)) {
		// For client components, we don't call them directly
		// Instead, resolve their children
		const { children, ...otherProps } = element.props as {
			children?: ReactNode;
			[key: string]: unknown;
		};

		if (children) {
			const resolvedChildren = await resolveChildren(children);
			return cloneElement(element, otherProps as object, resolvedChildren);
		}
		return element;
	}

	// For intrinsic elements (div, span, etc) or other element types, resolve children
	const { children, ...otherProps } = element.props as {
		children?: ReactNode;
		[key: string]: unknown;
	};

	if (children) {
		const resolvedChildren = await resolveChildren(children);
		return cloneElement(element, otherProps as object, resolvedChildren);
	}

	return element;
}

/**
 * Resolve children, handling arrays and single children
 */
async function resolveChildren(children: ReactNode): Promise<ReactNode> {
	if (Array.isArray(children)) {
		return Promise.all(children.map(resolveAsyncComponents));
	}

	// Handle Children.map for fragments and other special cases
	const childArray = Children.toArray(children);
	if (childArray.length === 0) {
		return children;
	}

	if (childArray.length === 1) {
		return resolveAsyncComponents(childArray[0]);
	}

	return Promise.all(childArray.map(resolveAsyncComponents));
}

/**
 * Render an async React Server Component for testing
 * Recursively resolves all async components in the tree, then uses RTL render
 * @param element - React element (can contain async server components)
 * @returns RTL render result
 */
export async function renderAsync(element: ReactElement): Promise<RenderResult> {
	const resolved = await resolveAsyncComponents(element);
	return render(resolved as ReactElement);
}

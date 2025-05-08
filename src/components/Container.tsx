import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
};

export function ContainerOuter({
    className,
    children,
    ref,
    ...props
}: ContainerProps) {
    return (
        <div ref={ref} className={cn("sm:px-8", className)} {...props}>
            <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
        </div>
    );
}

export function ContainerInner({
    className,
    children,
    ref,
    ...props
}: ContainerProps) {
    return (
        <div
            ref={ref}
            className={cn("relative px-4 sm:px-8 lg:px-12", className)}
            {...props}
        >
            <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
        </div>
    );
}

export function Container({ children, ref, ...props }: ContainerProps) {
    return (
        <ContainerOuter ref={ref} {...props}>
            <ContainerInner>{children}</ContainerInner>
        </ContainerOuter>
    );
}

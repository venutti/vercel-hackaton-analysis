import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
  href: string;
  label: string;
  disabled?: boolean;
};

export default function TooltipLink({
  children,
  href,
  label,
  disabled,
}: Props) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        {!disabled && (
          <TooltipTrigger asChild>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400"
            >
              {children}
            </a>
          </TooltipTrigger>
        )}
        {disabled && (
          <span className="cursor-not-allowed text-muted">{children}</span>
        )}
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

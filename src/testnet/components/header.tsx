export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M16.624 12L12 7.376L7.376 12L12 16.624L16.624 12Z"
                fill="currentColor"
              />
              <path
                d="M12 19.248L4.752 12L12 4.752L19.248 12L12 19.248ZM12 21.376L21.376 12L12 2.624L2.624 12L12 21.376Z"
                fill="currentColor"
              />
              <path
                d="M21.5 7.875L19.5 6.375L18.875 7H18V5.5H17V4.5H15.5V3H14V2H12V3H10V4.5H8.5V5.5H7V7H6L4.5 6.375L2.5 7.875L4 9.5V14.5L2.5 16.125L4.5 17.625L6 17V18.5H7V19.5H8.5V21H10V22H12V21H14V19.5H15.5V18.5H17V17H18.875L19.5 17.625L21.5 16.125L20 14.5V9.5L21.5 7.875Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-xl font-bold tracking-tighter text-foreground">
              Binance Testnet Trader
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Testnet Mode</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

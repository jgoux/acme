{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv/python-rewrite";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, systems, ... } @ inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      devShells = forEachSystem
        (system:
          let
            pkgs = nixpkgs.legacyPackages.${system};
          in
          {
            default = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules = [
                {
                  # https://devenv.sh/basics/
                  env.PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}";

                  # https://devenv.sh/packages/
                  packages = [
                    pkgs.infisical
                    pkgs.git
                    pkgs.playwright-driver
                  ];

                  # https://devenv.sh/services/
                  services.postgres = {
                    enable = true;
                    package = pkgs.postgresql_16;
                    initialDatabases = [{ name = "acme"; }];
                    listen_addresses = "localhost";
                    port = 2345;
                    initialScript = ''
                      CREATE USER postgres SUPERUSER;
                    '';
                  };

                  # https://devenv.sh/scripts/
                  # scripts.hello.exec = "echo hello from $GREET";

                  # enterShell = ''
                  #   hello
                  #   git --version
                  # '';

                  # https://devenv.sh/languages/
                  languages.javascript.enable = true;
                  languages.javascript.package = pkgs.nodejs_18;
                  languages.javascript.corepack.enable = true;

                  # https://devenv.sh/pre-commit-hooks/
                  # pre-commit.hooks.shellcheck.enable = true;

                  # https://devenv.sh/processes/
                  # processes.ping.exec = "ping example.com";

                  # See full reference at https://devenv.sh/reference/options/
                }
              ];
            };
          });
    };
}

{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  # env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = [
    pkgs.infisical
    pkgs.git
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

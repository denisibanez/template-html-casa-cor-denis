var CONSOLE_HOST = CONSOLE_HOST || "//alexandria.abril.com.br",
    EDITORIAL_DATA_ENTRY_URL = EDITORIAL_DATA_ENTRY_URL || "//editorial.alexandria.abril.com.br",
    MIDIA_DATA_ENTRY_URL = MIDIA_DATA_ENTRY_URL || "//midia.alexandria.abril.com.br",
    ASSET_PATCH = ASSET_PATCH || "";
    
will.as("widgetsConfig").configure(function (config) {
    config.queryString = ASSET_PATCH;
    config.addDomain(
        "local",                                            // default domain
        CONSOLE_HOST + "/javascripts/will/components",      // default component domain (repository)
        true);                                              // load as script (js)
    config.addDomain(
        "bar",
        EDITORIAL_DATA_ENTRY_URL.replace(/editorial/, "consolebar").replace(/:\d+/, '') +
        "/javascripts/will/components",
        true);
});
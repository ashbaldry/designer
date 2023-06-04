FROM rocker/verse:4.2.2
RUN apt-get update && apt-get install -y  git-core libcurl4-openssl-dev libicu-dev libssl-dev libxml2-dev make pandoc zlib1g-dev && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /usr/local/lib/R/etc/ /usr/lib/R/etc/
RUN echo "options(repos = c(CRAN = 'https://cran.rstudio.com/'), download.file.method = 'libcurl', Ncpus = 4)" | tee /usr/local/lib/R/etc/Rprofile.site | tee /usr/lib/R/etc/Rprofile.site
RUN R -e 'install.packages("remotes")'
RUN Rscript -e 'remotes::install_version("rappdirs", upgrade = "never", version = "0.3.3")'
RUN Rscript -e 'remotes::install_version("jsonlite", upgrade = "never", version = "1.8.4")'
RUN Rscript -e 'remotes::install_version("htmltools", upgrade = "never", version = "0.5.5")'
RUN Rscript -e 'remotes::install_version("fontawesome", upgrade = "never", version = "0.5.1")'
RUN Rscript -e 'remotes::install_version("bslib", upgrade = "never", version = "0.4.2")'
RUN Rscript -e 'remotes::install_version("shiny", upgrade = "never", version = "1.7.4")'
RUN Rscript -e 'remotes::install_version("config", upgrade = "never", version = "0.3.1")'
RUN Rscript -e 'remotes::install_version("shinyscreenshot", upgrade = "never", version = "0.2.0")'
RUN Rscript -e 'remotes::install_version("shinipsum", upgrade = "never", version = "0.1.0")'
RUN Rscript -e 'remotes::install_version("golem", upgrade = "never", version = "0.4.0")'
RUN Rscript -e 'remotes::install_version("cicerone", upgrade = "never", version = "1.0.4")'
RUN Rscript -e 'remotes::install_version("bs4Dash", upgrade = "never", version = "2.2.1")'
RUN mkdir /build_zone
ADD . /build_zone
WORKDIR /build_zone
RUN Rscript -e 'remotes::install_local(upgrade = "never")'
RUN rm -rf /build_zone
EXPOSE 80
CMD R -e "options('shiny.port' = 80, shiny.host = '0.0.0.0'); designer::designApp()"

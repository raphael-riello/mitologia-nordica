import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SectionListing from "./pages/SectionListing";
import ContentDetail from "./pages/ContentDetail";
import Comunidade from "./pages/Comunidade";
import Forum from "./pages/Forum";
import Artes from "./pages/Artes";
import Servidores from "./pages/Servidores";
import { useEffect } from "react";
import { useLocation } from "wouter";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />

        {/* Comunidade */}
        <Route path="/comunidade" component={Comunidade} />
        <Route path="/comunidade/forum" component={Forum} />
        <Route path="/comunidade/artes" component={Artes} />
        <Route path="/comunidade/servidores" component={Servidores} />
        <Route path="/comunidade/:category/:slug">
          {(params) => (
            <ContentDetail section="comunidade" category={params.category} slug={params.slug} />
          )}
        </Route>

        {/* Seções de conteúdo */}
        <Route path="/historias">
          {() => <SectionListing sectionSlug="historias" />}
        </Route>
        <Route path="/glossario">
          {() => <SectionListing sectionSlug="glossario" />}
        </Route>
        <Route path="/jogos">
          {() => <SectionListing sectionSlug="jogos" />}
        </Route>
        <Route path="/conteudo">
          {() => <SectionListing sectionSlug="conteudo" />}
        </Route>

        {/* Detalhe de conteúdo */}
        <Route path="/historias/:category/:slug">
          {(params) => (
            <ContentDetail section="historias" category={params.category} slug={params.slug} />
          )}
        </Route>
        <Route path="/glossario/:category/:slug">
          {(params) => (
            <ContentDetail section="glossario" category={params.category} slug={params.slug} />
          )}
        </Route>
        <Route path="/jogos/:category/:slug">
          {(params) => (
            <ContentDetail section="jogos" category={params.category} slug={params.slug} />
          )}
        </Route>
        <Route path="/conteudo/:category/:slug">
          {(params) => (
            <ContentDetail section="conteudo" category={params.category} slug={params.slug} />
          )}
        </Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import { Link, Route, Switch } from 'react-router-dom';
import createLoadableMarkdownContent from '../components/createLoadableMarkdownContent';
import Loading from '../components/Loading';
import PackageAPIPage from './PackageAPIPage';
import PackageDocPage from './PackageDocPage';
import PackageExamples from './PackageExamples';
import PackageSummary from '../components/PackageSummary';
import Page from '../components/Page';
import { getPackage } from '../siteData';

const Title = styled('h1')``;
const NavigationList = styled('ol')`
  list-style: none;
  padding: 0;
  li {
    display: ${p => p.horizontal ? 'inline-block' : 'block'};
    margin: 0.65rem;
  }
  li:first-of-type {
    margin-left: 0;
  }
`;
const NavigationListItem = styled('li')`
  border-bottom: 3px solid;
  border-bottom-color: ${p => p.isSelected ? 'blue' : 'transparent'};
  a:active,
  a:link,
  a:visited {
    color: #474c54;
    display: block;
    text-decoration: none;
  }
  a:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export default ({ match, location: { pathname } }) => {
  const pkgId = match.params.packageName;
  const isExamplesRoute = pathname.match(new RegExp(`/packages/${pkgId}/examples/.*`));
  const pkg = getPackage(pkgId);

  const Summary = Loadable({
    loader: () => pkg.pkgJson.exports(),
    loading: Loading,
    render(pkgJson) {
      return (
        <PackageSummary
          description={pkgJson.description}
          name={pkgJson.name}
          sourceName={pkg.id}
          version={pkgJson.version}
        />
      );
    }
  });
  const intro = Loadable({
    loader: () => pkg.intro.exports(),
    loading: Loading,
  });
  const Usage = createLoadableMarkdownContent(pkg.usage);
  const Style = createLoadableMarkdownContent(pkg.style);

  return (
    <Page width={isExamplesRoute ? 'xlarge' : 'large'}>
      <Title>{pkg.title}</Title>
      <Summary />

      <NavigationList horizontal>
        <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}$`))}>
          <Link to={`/packages/${pkgId}`}>code</Link>
        </NavigationListItem>
        <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}/api$`))}>
          <Link to={`/packages/${pkgId}/api`}>api</Link>
        </NavigationListItem>
        {pkg.usage && (
          <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}/usage$`))}>
            <Link to={`/packages/${pkgId}/usage`}>usage</Link>
          </NavigationListItem>
        )}
        {pkg.style && (
          <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}/style$`))}>
            <Link to={`/packages/${pkgId}/style`}>style</Link>
          </NavigationListItem>
        )}
        {pkg.examples.length > 0 && (
          <NavigationListItem isSelected={isExamplesRoute}>
            <Link to={`/packages/${pkgId}/examples/${pkg.examples[0].id}/component`}>examples</Link>
          </NavigationListItem>
        )}
      </NavigationList>

      <Switch>
        <Route exact path={`/packages/${pkgId}`} component={intro} />
        <Route exact path="/packages/:packageName/api" component={PackageAPIPage} />
        <Route exact path="/packages/:packageName/docs/:docId" component={PackageDocPage} />
        <Route path="/packages/:packageName/docs/:docId/edit" component={({ match: { params: { packageName, docId } } }) => {
          const routePackage = getPackage(packageName);
          const docName = routePackage.docs.find(page => page.id === docId).name;
          window.location.href = `https://github.com/versionone/vue/edit/master/components/${packageName}/docs/docs/${docName}`;
          return <Loading />;
        }} />
        <Route exact path="/packages/:packageName/:pageId" component={({ match: { params: { pageId } } }) => {
          if (pkg.usage && pageId === 'usage') return <Usage />;
          if (pkg.style && pageId === 'style') return <Style />;
          return null;
        }} />
        <Route path="/packages/:packageName/:pageId/edit" component={({ match: { params: { packageName, pageId } } }) => {
          window.location.href = `https://github.com/versionone/vue/edit/master/components/${packageName}/docs/${pageId}.md`;
          return <Loading />;
        }} />
        <Route path="/packages/:packageName/examples/:exampleId/:exampleType" component={PackageExamples} />
      </Switch>
    </Page >
  );
};

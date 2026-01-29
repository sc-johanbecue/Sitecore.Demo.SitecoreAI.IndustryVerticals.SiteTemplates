// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as ThemeEditor from 'src/components/theme-editor/ThemeEditor';
import * as Subscribe from 'src/components/subscribe/Subscribe';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SocialFeed from 'src/components/social-feed/SocialFeed';
import * as SelectedProducts from 'src/components/selected-products/SelectedProducts';
import * as SelectedArticles from 'src/components/selected-articles/SelectedArticles';
import * as SectionWrapper from 'src/components/section-wrapper/SectionWrapper';
import * as SearchResults from 'src/components/search-results/SearchResults';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Reviews from 'src/components/reviews/Reviews';
import * as Promo from 'src/components/promo/Promo';
import * as ProductListing from 'src/components/product-listing/ProductListing';
import * as ProductDetails from 'src/components/product-details/ProductDetails';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Offers from 'src/components/offers/Offers';
import * as SuggestionBlock from 'src/components/non-sitecore/search/SuggestionBlock';
import * as Spinner from 'src/components/non-sitecore/search/Spinner';
import * as SortOrder from 'src/components/non-sitecore/search/SortOrder';
import * as SearchResultsComponent from 'src/components/non-sitecore/search/SearchResultsComponent';
import * as SearchPagination from 'src/components/non-sitecore/search/SearchPagination';
import * as SearchFacets from 'src/components/non-sitecore/search/SearchFacets';
import * as ResultsPerPage from 'src/components/non-sitecore/search/ResultsPerPage';
import * as QuestionsAnswers from 'src/components/non-sitecore/search/QuestionsAnswers';
import * as QueryResultsSummary from 'src/components/non-sitecore/search/QueryResultsSummary';
import * as PreviewSearch from 'src/components/non-sitecore/search/PreviewSearch';
import * as HomeHighlighted from 'src/components/non-sitecore/search/HomeHighlighted';
import * as CardViewSwitcher from 'src/components/non-sitecore/search/CardViewSwitcher';
import * as ArticleHorizontalCard from 'src/components/non-sitecore/search/ArticleHorizontalCard';
import * as ArticleCard from 'src/components/non-sitecore/search/ArticleCard';
import * as NavigationIcons from 'src/components/navigation-icons/NavigationIcons';
import * as Navigation from 'src/components/navigation/Navigation';
import * as MattheyVideoSection from 'src/components/matthey/custom-header/MattheyVideoSection';
import * as MattheyTextWithImageSection from 'src/components/matthey/custom-header/MattheyTextWithImageSection';
import * as MattheyStatsSection from 'src/components/matthey/custom-header/MattheyStatsSection';
import * as MattheyStatsCard from 'src/components/matthey/custom-header/MattheyStatsCard';
import * as MattheySocialFollow from 'src/components/matthey/custom-header/MattheySocialFollow';
import * as MattheySharePriceCard from 'src/components/matthey/custom-header/MattheySharePriceCard';
import * as MattheyRichTextSection from 'src/components/matthey/custom-header/MattheyRichTextSection';
import * as MattheyRelatedLinksSection from 'src/components/matthey/custom-header/MattheyRelatedLinksSection';
import * as MattheyRelatedLinksCard from 'src/components/matthey/custom-header/MattheyRelatedLinksCard';
import * as MattheyReadMoreSection from 'src/components/matthey/custom-header/MattheyReadMoreSection';
import * as MattheyReadMoreCard from 'src/components/matthey/custom-header/MattheyReadMoreCard';
import * as MattheyPageHeroSection from 'src/components/matthey/custom-header/MattheyPageHeroSection';
import * as MattheyNewsSection from 'src/components/matthey/custom-header/MattheyNewsSection';
import * as MattheyNewsDetail from 'src/components/matthey/custom-header/MattheyNewsDetail';
import * as MattheyNewsCard from 'src/components/matthey/custom-header/MattheyNewsCard';
import * as MattheyNavigationIcons from 'src/components/matthey/custom-header/MattheyNavigationIcons';
import * as MattheyNavigation from 'src/components/matthey/custom-header/MattheyNavigation';
import * as MattheyLogo from 'src/components/matthey/custom-header/MattheyLogo';
import * as MattheyHeroCarouselSection from 'src/components/matthey/custom-header/MattheyHeroCarouselSection';
import * as MattheyHeroCarouselCard from 'src/components/matthey/custom-header/MattheyHeroCarouselCard';
import * as MattheyHeader from 'src/components/matthey/custom-header/MattheyHeader';
import * as MattheyFooter from 'src/components/matthey/custom-header/MattheyFooter';
import * as MattheyContentSection from 'src/components/matthey/custom-header/MattheyContentSection';
import * as LinkList from 'src/components/link-list/LinkList';
import * as LanguageSwitcher from 'src/components/language-switcher/LanguageSwitcher';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as Header from 'src/components/header/Header';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ContactForm from 'src/components/contact-form/ContactForm';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as Breadcrumb from 'src/components/breadcrumb/Breadcrumb';
import * as ArticleListing from 'src/components/article-listing/ArticleListing';
import * as ArticleDetails from 'src/components/article-details/ArticleDetails';
import * as AllProductsCarousel from 'src/components/all-products-carousel/AllProductsCarousel';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['ThemeEditor', { ...ThemeEditor }],
  ['Subscribe', { ...Subscribe }],
  ['SocialFollow', { ...SocialFollow }],
  ['SocialFeed', { ...SocialFeed }],
  ['SelectedProducts', { ...SelectedProducts }],
  ['SelectedArticles', { ...SelectedArticles, componentType: 'client' }],
  ['SectionWrapper', { ...SectionWrapper }],
  ['SearchResults', { ...SearchResults }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Reviews', { ...Reviews }],
  ['Promo', { ...Promo }],
  ['ProductListing', { ...ProductListing }],
  ['ProductDetails', { ...ProductDetails }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Offers', { ...Offers }],
  ['SuggestionBlock', { ...SuggestionBlock }],
  ['Spinner', { ...Spinner }],
  ['SortOrder', { ...SortOrder }],
  ['SearchResultsComponent', { ...SearchResultsComponent }],
  ['SearchPagination', { ...SearchPagination }],
  ['SearchFacets', { ...SearchFacets }],
  ['ResultsPerPage', { ...ResultsPerPage }],
  ['QuestionsAnswers', { ...QuestionsAnswers }],
  ['QueryResultsSummary', { ...QueryResultsSummary }],
  ['PreviewSearch', { ...PreviewSearch }],
  ['HomeHighlighted', { ...HomeHighlighted }],
  ['CardViewSwitcher', { ...CardViewSwitcher }],
  ['ArticleHorizontalCard', { ...ArticleHorizontalCard }],
  ['ArticleCard', { ...ArticleCard }],
  ['NavigationIcons', { ...NavigationIcons }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['MattheyVideoSection', { ...MattheyVideoSection, componentType: 'client' }],
  ['MattheyTextWithImageSection', { ...MattheyTextWithImageSection, componentType: 'client' }],
  ['MattheyStatsSection', { ...MattheyStatsSection, componentType: 'client' }],
  ['MattheyStatsCard', { ...MattheyStatsCard, componentType: 'client' }],
  ['MattheySocialFollow', { ...MattheySocialFollow }],
  ['MattheySharePriceCard', { ...MattheySharePriceCard, componentType: 'client' }],
  ['MattheyRichTextSection', { ...MattheyRichTextSection, componentType: 'client' }],
  ['MattheyRelatedLinksSection', { ...MattheyRelatedLinksSection, componentType: 'client' }],
  ['MattheyRelatedLinksCard', { ...MattheyRelatedLinksCard, componentType: 'client' }],
  ['MattheyReadMoreSection', { ...MattheyReadMoreSection, componentType: 'client' }],
  ['MattheyReadMoreCard', { ...MattheyReadMoreCard, componentType: 'client' }],
  ['MattheyPageHeroSection', { ...MattheyPageHeroSection }],
  ['MattheyNewsSection', { ...MattheyNewsSection, componentType: 'client' }],
  ['MattheyNewsDetail', { ...MattheyNewsDetail }],
  ['MattheyNewsCard', { ...MattheyNewsCard }],
  ['MattheyNavigationIcons', { ...MattheyNavigationIcons }],
  ['MattheyNavigation', { ...MattheyNavigation, componentType: 'client' }],
  ['MattheyLogo', { ...MattheyLogo }],
  ['MattheyHeroCarouselSection', { ...MattheyHeroCarouselSection, componentType: 'client' }],
  ['MattheyHeroCarouselCard', { ...MattheyHeroCarouselCard, componentType: 'client' }],
  ['MattheyHeader', { ...MattheyHeader }],
  ['MattheyFooter', { ...MattheyFooter, componentType: 'client' }],
  ['MattheyContentSection', { ...MattheyContentSection }],
  ['LinkList', { ...LinkList }],
  ['LanguageSwitcher', { ...LanguageSwitcher, componentType: 'client' }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner }],
  ['Header', { ...Header }],
  ['Footer', { ...Footer }],
  ['Features', { ...Features }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ContactForm', { ...ContactForm, componentType: 'client' }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['Breadcrumb', { ...Breadcrumb }],
  ['ArticleListing', { ...ArticleListing }],
  ['ArticleDetails', { ...ArticleDetails }],
  ['AllProductsCarousel', { ...AllProductsCarousel }],
]);

export default componentMap;

import {BreadcrumbWrapper} from './styles';

import {
  Breadcrumb as Crumb,
  BreadcrumbItem,
  BreadcrumbLink
} from "@chakra-ui/react"

export default function Breadcrumb({path}) {
  const pathArray = path.split('/')
  return (
    <BreadcrumbWrapper>
      <Crumb color="gray.500">
          {pathArray.map((breadcrumb, index) => {
            if (breadcrumb !== '') {
              const regex = /(-)/g
              if (breadcrumb !== 'Home') {
                return (
                <BreadcrumbItem key={breadcrumb}>
                <BreadcrumbLink href={`/${pathArray.slice(1, index + 1).join('/')}`}>{breadcrumb.replace(regex, ' ')}</BreadcrumbLink>
                </BreadcrumbItem>
                ) 
              } else {
                return (
                <BreadcrumbItem key={breadcrumb}>
                <BreadcrumbLink href={`/`}>{breadcrumb.replace(regex, ' ')}</BreadcrumbLink>
                </BreadcrumbItem>
                )
              }
            }
          })}
          </Crumb>
      </BreadcrumbWrapper>
  )
}
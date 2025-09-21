'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'; // Adjust path as needed

// Utility function to convert URL segments to readable titles
function formatSegment(segment) {
  // Handle special cases
  const specialCases = {
    'dashboard': 'Dashboard',
    'components': 'Components',
    'settings': 'Settings',
    'profile': 'Profile',
    'users': 'Users',
    'products': 'Products',
    'orders': 'Orders'
  };

  if (specialCases[segment]) {
    return specialCases[segment];
  }

  // Handle dynamic segments (UUIDs, IDs, etc.)
  if (/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(segment)) {
    return 'Details';
  }
  
  if (/^\d+$/.test(segment)) {
    return 'Item #' + segment;
  }

  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  
  // Split path and filter out empty segments
  const pathSegments = pathname.split('/').filter(segment => segment);

  // Don't show breadcrumb on home page
  if (pathSegments.length === 0) {
    return null;
  }

 return (
  <Breadcrumb>
    <BreadcrumbList className={`px-4 md:px-6 bg-gray-100 py-4 md:py-6`}>
      {/* Home link
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator /> */}

      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = '/' + pathSegments.slice(0, index + 1).join('/');

        return (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{formatSegment(segment)}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        );
      })}
    </BreadcrumbList>
  </Breadcrumb>
);
}
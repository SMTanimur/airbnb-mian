'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from 'react';
import { IconType } from "react-icons";

import qs from 'query-string';

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    firstCategory?: boolean;
    lastCategory?: boolean;
}

const CategoryBox : React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
    firstCategory,
    lastCategory
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        };

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [label, params, router])

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-center
                mx-4
                ${firstCategory && !lastCategory ? 'ml-0' : ''}
                ${!firstCategory && lastCategory ? 'mr-0' : ''}
                pb-3
                mt-4
                mb-4
                border-b-2
                hover:text-neutral-800
                md:hover:border-b-neutral-300
                transition
                duration-150
                ease-in-out
                cursor-pointer
                ${selected ? 'md:border-b-neutral-800 border-b-[3px]' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
                whitespace-nowrap
            `}
        >   
            <Icon size={24} />
            <div className="font-bold text-xs mt-3">
                {label}
            </div>
        </div>
    );
}
 
export default CategoryBox;
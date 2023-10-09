'use client';
import useZodForm from '@/app/hooks/useZodForm';
import { cn } from '@/app/libs/utils';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useSetAtom } from 'jotai';
import { Fragment, useEffect, useState } from 'react';
import CustomInput from '../inputs/CustomInput';
import useFilterModal from '@/app/hooks/useFIlterModal';
import qs from 'query-string';
import useFilterStateModal from '@/app/hooks/useFilterState';
import useFilterState from '@/app/hooks/useFilterState';
import { filterSchema } from '@/app/libs/filter';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

function isEmptyString(str: string) {
  return !str || str.length === 0;
}

export default function FilterModal() {
  const { isOpen, onClose, onOpen } = useFilterModal();
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={() => onClose()}>
        <Transition.Child
          enter='duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='fixed inset-0 bg-black/75'
          aria-hidden='true'
        />

        <Transition.Child
          enter='duration-300'
          enterFrom='translate-y-[calc(50vh+50%)]'
          enterTo='translate-y-0'
          leave='duration-300'
          leaveFrom='translate-y-0'
          leaveTo='translate-y-[calc(50vh+50%)]'
          as={Fragment}
        >
          <Dialog.Panel className='fixed inset-0 mx-2 my-auto h-fit max-w-2xl rounded-xl bg-white dark:bg-neutral-800 md:mx-auto'>
            <FilterModalInner />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

function FilterModalInner() {
  const { isOpen, onClose, onOpen } = useFilterModal();
  const params = useSearchParams();
  const router = useRouter();
  const { filterState: filterOptions, setFilerState: setFilterOptions } =
    useFilterState();

  // const [filterOptions, setFilterOptions] = useAtom(filterOptionsAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm();

  const [guestCount, setGuestCount] = useState<number | undefined>(undefined);
  const [bathroomCount, setBathroomCount] = useState<number | undefined>(
    undefined
  );

  // useEffect(() => {
  //   if (filterOptions.bedCount) setGuestCount(filterOptions.bedCount);
  //   if (filterOptions.bathroomCount)
  //     setBathroomCount(filterOptions.bathroomCount);
  // }, [
  //   filterOptions.bathroomCount,
  //   filterOptions.bedCount,
  //   filterOptions.minPrice,
  // ]);

  const onSubmit = handleSubmit(({ maxPrice, minPrice }) => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      maxPrice,
      minPrice,
      guestCount,
      bathroomCount,
    };

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
 
    onClose();
    router.push(url);
  });

  const onClear = () => {
    setValue('maxPrice', undefined);
    setValue('minPrice', undefined);
    setGuestCount(undefined);
    setBathroomCount(undefined);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='relative p-6'>
      
          <button
            className='
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  '
            onClick={() => onClose()}
          >
            <IoMdClose size={18} />
          </button>
          {/* <i
            onClick={() => onClose()}
            className='ri-close-line text-gray-900 cursor-pointer text-2xl'
          ></i> */}
    
        <h1 className='text-center text-lg font-bold'>Filters</h1>
      </div>
      <div className='border-t' />
      <div className='space-y-5 p-6'>
        <h1 className='text-xl font-bold'>Price Range ($)</h1>
        <div className='flex gap-x-6 [&>*]:grow'>
          <CustomInput
            inputProps={{
              type: 'number',
              placeholder: 'Minimum',

              ...register('minPrice', {
                setValueAs: value =>
                  isEmptyString(value) ? undefined : Number(value),
              }),
            }}
          />
          <div className='max-w-[16px] self-center border-t-2' />
          <CustomInput
            inputProps={{
              type: 'number',
              placeholder: 'Maximum',
              ...register('maxPrice', {
                setValueAs: value =>
                  isEmptyString(value) ? undefined : Number(value),
              }),
            }}
          />
        </div>
        <div className='border-t' />
        <h1 className='text-xl font-bold'>GuestRoom and bathrooms</h1>
        <h3 className='text-lg'>GuestRoom </h3>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => setGuestCount(undefined)}
            className={cn(
              guestCount === undefined
                ? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
                : '',
              'h-10 rounded-full border px-6'
            )}
          >
            Any
          </button>
          {Array.from({ length: 8 }, (_, i) => (
            <button
              type='button'
              onClick={() => setGuestCount(i + 1)}
              key={i}
              className={cn(
                guestCount === i + 1
                  ? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
                  : '',
                'h-10 rounded-full border px-6'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <h3 className='text-lg'>Bathrooms</h3>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => setBathroomCount(undefined)}
            className={cn(
              bathroomCount === undefined
                ? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
                : '',
              'h-10 rounded-full border px-6'
            )}
          >
            Any
          </button>
          {Array.from({ length: 8 }, (_, i) => (
            <button
              type='button'
              onClick={() => setBathroomCount(i + 1)}
              key={i}
              className={cn(
                bathroomCount === i + 1
                  ? 'bg-slate-950 text-white transition-colors duration-300 dark:bg-white dark:text-black'
                  : '',
                'h-10 rounded-full border px-6'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className='border-t' />
      <div className='flex justify-between p-6'>
        <button
          onClick={onClear}
          type='button'
          className='h-12 rounded-lg border px-4 font-bold'
        >
          Clear
        </button>
        <button
          type='submit'
          className='h-12 rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-4 font-bold text-white'
        >
          Show places
        </button>
      </div>
    </form>
  );
}

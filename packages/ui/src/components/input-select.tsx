'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '../core/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Label } from './label';
import { Skeleton } from './skeleton';
import { Typo } from './typo';

const InputSelect = SelectPrimitive.Root;

const InputSelectGroup = SelectPrimitive.Group;

const InputSelectValue = SelectPrimitive.Value;

const inputSelectTriggerVariants = cva(
  `flex w-full items-center justify-between
    text-zinc-900 dark:text-zinc-50 
    rounded-md border border-solid bg-transparent hover:bg-input-hover
    transition duration-200 ease-in-out
    placeholder:text-zinc-300 dark:placeholder:text-zinc-600 
    focus:outline-none disabled:cursor-not-allowed 
    disabled:opacity-50 [&>span]:line-clamp-1`,
  {
    variants: {
      state: {
        default: `border-zinc-200 dark:border-zinc-600 
                  hover:border-zinc-400 dark:hover:border-zinc-500
                  focus:border-zinc-700 dark:focus:border-zinc-300`,
        error: 'border-red-500 focus:border-red-500',
      },
      size: {
        sm: 'px-2.5 py-1 text-sm h-9',
        md: 'px-3 py-1.5 text-base h-11',
        lg: 'px-4 py-2 text-base h-14',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
);

const loadingSizeMapper = {
  sm: '2.25rem',
  md: '3rem',
  lg: '3.5rem',
};

export interface InputSelectProps
  extends VariantProps<typeof inputSelectTriggerVariants>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
}

const InputSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  InputSelectProps
>(
  (
    { className, children, state, size, label, loading, error, ...props },
    ref,
  ) => (
    <>
      {label && (
        <>
          {!loading ? (
            <Label htmlFor={props.id}>{label}</Label>
          ) : (
            <Skeleton width={'7.5rem'} height={'0.875rem'} />
          )}
        </>
      )}
      {!loading ? (
        <SelectPrimitive.Trigger
          ref={ref}
          className={inputSelectTriggerVariants({ state, size, className })}
          {...props}
        >
          {children}
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      ) : (
        <Skeleton
          width={'100%'}
          height={loadingSizeMapper[size || 'md']}
          className="!rounded-md"
        />
      )}
      {error && (
        <Typo variant={'sm'} state={'error'}>
          {error}
        </Typo>
      )}
    </>
  ),
);
InputSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const InputSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
InputSelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const InputSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
InputSelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const InputSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-[60] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <InputSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <InputSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
InputSelectContent.displayName = SelectPrimitive.Content.displayName;

const InputSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
InputSelectLabel.displayName = SelectPrimitive.Label.displayName;

const InputSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 
      text-sm outline-none focus:bg-accent focus:text-accent-foreground 
      hover:bg-accent hover:text-accent-foreground
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
InputSelectItem.displayName = SelectPrimitive.Item.displayName;

const InputSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
InputSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  InputSelect,
  InputSelectGroup,
  InputSelectValue,
  InputSelectTrigger,
  InputSelectContent,
  InputSelectLabel,
  InputSelectItem,
  InputSelectSeparator,
  InputSelectScrollUpButton,
  InputSelectScrollDownButton,
};


'use client';

import { useActionState } from 'react';
import {
  deleteCustomer,
  CustomerState,
} from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  const deleteCustomerWithId = deleteCustomer.bind(null, id);

  const initialState: CustomerState = {
    message: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState<
    CustomerState,
    FormData
  >(
    deleteCustomerWithId,
    initialState,
  );

  return (
    <div className="flex flex-col items-end gap-2">
      <form
        action={formAction}
        onSubmit={(event) => {
          const confirmed = window.confirm(
            'Are you sure you want to delete this customer?',
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md border border-gray-700 bg-white p-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          title="Delete customer"
          aria-label="Delete customer"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </form>

      {state.message && (
        <p
          className="max-w-xs text-right text-sm leading-5 text-red-500"
          aria-live="polite"
        >
          Cannot delete this customer
          <br />
          because they have invoices.
        </p>
      )}
    </div>
  );
}


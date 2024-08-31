import styled from "styled-components";
import React, { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

//eslint-disable-next-line
export default function CabinRow({ cabin }) {
  //eslint-disable-next-line
  const [showForm, setShowForm] = useState(false);
  //eslint-disable-next-line
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deletecabin } = useDeleteCabin();
  //eslint-disable-next-line
  const {
    id: cabinId,
    name,
    discount,
    image,
    regularPrice,
    maxCapacity,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Duplicat de ${name}`,
      discount: 0,
      maxCapacity,
      regularPrice,
      image,
      description,
    });
  }
  // const queryClient = useQueryClient();

  // const { isLoadidng: isDeleting, mutate } = useMutation({
  //   mutationFn: (id) => deleteCabin(id),
  //   //with only the mutstionFn the ui won't be in sync with the changes,we must add the onSuccess stuff
  //   onSuccess: () => {
  //     toast.success("Successfully deleted cabin");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //   },
  //   onError: (err) => toast.error(err.message),
  // });
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                onConfirm={() => deletecabin(cabinId)}
                resourceName="cabins"
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

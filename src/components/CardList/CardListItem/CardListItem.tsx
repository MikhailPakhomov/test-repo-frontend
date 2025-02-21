import { createMutation, QueryClient } from "@tanstack/solid-query";
import { createSignal, Show } from "solid-js";
import { patchUserPhone } from "../../../api/apiClient";
import { queryClient } from "./../../../index";

const CardListItem = (props: any) => {
  const [isEdit, setIsEdit] = createSignal(false);
  const [inputValue, setInputValue] = createSignal(props.phone);
  const [phone, setPhone] = createSignal(props.phone);
  const [userId, setUserId] = createSignal(1);

  const mutationUserPhone = createMutation({
    mutationFn: patchUserPhone,
    onSuccess: (_, { id }) => {
      console.log("Данные успешно обновлены!");
      handleEdit();
      // queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении:", error);
    },
  });

  let inputRef;

  const handleEdit = () => {
    setIsEdit(!isEdit());
    inputRef.focus();
  };

  const handleChange = (event: Event) => {
    console.log(event.target.value);
    setInputValue(event?.target?.value);
  };

  const handleSaveNumber = (num: string, id) => {
    setPhone(num);
    queryClient.setQueryData(["users"], (oldUsers) => {
      return oldUsers.map((user) => {
        return user.id === id ? { ...user, phone: phone() } : user;
      });
    });
  };
  return (
    <div class="flex flex-col max-w-[330px] min-h-[312px] p-[20px] bg-white rounded-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <rect width="30" height="30" rx="8" fill="#CAF6CE" />
        <path
          d="M16.1227 24.81C14.21 24.81 12.4778 24.3881 10.926 23.5444C9.39228 22.6823 8.18333 21.4992 7.29917 19.9951C6.43306 18.491 6 16.7943 6 14.905C6 13.0157 6.44208 11.319 7.32624 9.81493C8.21039 8.31084 9.41934 7.13691 10.9531 6.29315C12.5049 5.43105 14.2371 5 16.1498 5C17.7016 5 19.118 5.27514 20.3991 5.82542C21.6803 6.3757 22.7629 7.1736 23.6471 8.21913C22.3941 9.417 20.4361 9.2311 18.8332 8.597C18.0573 8.29006 17.217 8.13658 16.3122 8.13658C15.013 8.13658 13.8492 8.43007 12.8206 9.01703C11.7921 9.58565 10.9892 10.3836 10.4118 11.4107C9.83436 12.4379 9.54565 13.6027 9.54565 14.905C9.54565 16.2073 9.83436 17.3721 10.4118 18.3993C10.9892 19.4265 11.7921 20.2335 12.8206 20.8205C13.8492 21.3891 15.013 21.6734 16.3122 21.6734C16.9915 21.6734 17.6346 21.5858 18.2413 21.4107C19.9396 20.9204 22.1656 21.2493 22.8671 22.8962L23.4451 24.2533C23.5686 24.5433 23.5302 24.944 23.223 24.9928C22.4211 25.1201 21.4708 23.5192 20.3721 23.9846C19.0909 24.5349 17.6745 24.81 16.1227 24.81Z"
          fill="#0CCA1F"
        />
        <path
          d="M16.0371 15.6908C16.0371 17.159 15.047 16.4988 13.8256 16.4988C12.6041 16.4988 11.614 17.159 11.614 15.6908C11.614 14.2226 12.6041 13.0324 13.8256 13.0324C15.047 13.0324 16.0371 14.2226 16.0371 15.6908Z"
          fill="#0CCA1F"
        />
        <path
          d="M21.9914 15.7382C21.9914 17.2326 21.0012 16.5672 19.7798 16.5672C18.5584 16.5672 17.5682 17.2326 17.5682 15.7382C17.5682 14.2438 18.5584 13.0324 19.7798 13.0324C21.0012 13.0324 21.9914 14.2438 21.9914 15.7382Z"
          fill="#0CCA1F"
        />
      </svg>

      <div class="flex justify-between">
        <span class="text-[#11253E] text-[18px] font-semibold leading-[34px] mb-[8px]">
          {props.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="14.5"
            fill="#CAF6CE"
          />
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="14.5"
            stroke="#BEEAC2"
          />
          <path
            d="M22.5684 18.3515L20.7012 11.6164C20.326 10.2616 19.5083 9.07126 18.3782 8.23506C17.2481 7.39886 15.8707 6.96487 14.4653 7.00222C13.06 7.03958 11.7076 7.54612 10.6235 8.44118C9.53944 9.33623 8.78605 10.5683 8.48336 11.9412L7.03965 18.4362C6.98553 18.6799 6.98683 18.9327 7.04346 19.1758C7.1001 19.419 7.21061 19.6463 7.36686 19.841C7.5231 20.0357 7.72108 20.1928 7.94618 20.3008C8.17129 20.4087 8.41776 20.4648 8.66741 20.4647H11.4301C11.6423 21.1986 12.0873 21.8436 12.6979 22.3027C13.3085 22.7618 14.0518 23.01 14.8157 23.01C15.5796 23.01 16.3229 22.7618 16.9335 22.3027C17.5441 21.8436 17.989 21.1986 18.2012 20.4647H20.9626C21.2196 20.4647 21.4732 20.4053 21.7034 20.2912C21.9337 20.177 22.1344 20.0111 22.2899 19.8065C22.4455 19.6019 22.5516 19.3641 22.6 19.1117C22.6484 18.8593 22.6372 18.5991 22.5684 18.3515ZM9.08285 18.4642L10.4365 12.3713C10.6439 11.4351 11.1584 10.5951 11.8983 9.98517C12.6381 9.37521 13.5608 9.03027 14.5193 9.00527C15.4779 8.98027 16.4173 9.27665 17.1879 9.84722C17.9586 10.4178 18.5162 11.2298 18.7721 12.1539L20.5245 18.4642H9.08285Z"
            fill="#0CCA1F"
          />
        </svg>
      </div>
      <div class="flex justify-between gap-[10px] mb-[14px]">
        <div class="flex flex-col max-w-[100px]">
          <span class="text-[#11253E] text-[11px] font-semibold">Ник</span>
          <span class="text-[12px] font-semibold ">{props.username}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-[#11253E] text-[11px] font-semibold">Компания</span>
          <span class="text-[12px] font-semibold flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis">
            {props.company.name}
          </span>
        </div>
        <div class="flex flex-col max-w-[100px]">
          <span class="text-[#11253E] text-[11px] font-semibold">Город</span>
          <span class="text-[12px] font-semibold break-words">
            {props.address.city}
          </span>
        </div>
      </div>
      <Show
        when={!isEdit()}
        fallback={
          <button
            onclick={() => {
              handleSaveNumber(inputValue(), props.id);
              mutationUserPhone.mutate({ id: props.id, phone: phone() });
            }}
            class="flex justify-center items-center gap-[6px] bg-[#11253E] h-[42px] rounded-md mb-[14px]"
            disabled={mutationUserPhone.isLoading}
          >
            <span class="text-white text-[14px]">
              {mutationUserPhone.isLoading ? "Сохранение..." : "Сохранить"}
            </span>
          </button>
        }
      >
        <button
          onclick={handleEdit}
          class="flex justify-center items-center gap-[6px] bg-[#11253E] h-[42px] rounded-md mb-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <g clip-path="url(#clip0_1_48)">
              <path
                d="M13.3309 0.66967C12.9343 0.273702 12.3968 0.0513 11.8364 0.0513C11.276 0.0513 10.7385 0.273702 10.3419 0.66967L0.854584 10.157C0.582898 10.4272 0.367479 10.7485 0.220792 11.1025C0.0741043 11.4564 -0.000939782 11.8359 1.10965e-06 12.2191V13.4167C1.10965e-06 13.5714 0.0614593 13.7198 0.170855 13.8292C0.280252 13.9385 0.428625 14 0.583334 14H1.78092C2.16403 14.0011 2.54355 13.9262 2.89751 13.7796C3.25147 13.633 3.57283 13.4176 3.843 13.146L13.3309 3.65809C13.7267 3.26153 13.949 2.72415 13.949 2.16388C13.949 1.60361 13.7267 1.06622 13.3309 0.66967ZM3.01817 12.3212C2.68917 12.648 2.24465 12.832 1.78092 12.8333H1.16667V12.2191C1.16608 11.9892 1.21109 11.7615 1.29911 11.5491C1.38712 11.3367 1.51638 11.1439 1.67942 10.9818L8.8795 3.78175L10.2212 5.12342L3.01817 12.3212ZM12.5055 2.83325L11.0437 4.29567L9.702 2.95692L11.1644 1.4945C11.2525 1.4066 11.3571 1.33691 11.4721 1.28941C11.5871 1.24191 11.7104 1.21753 11.8348 1.21767C11.9593 1.2178 12.0825 1.24245 12.1974 1.2902C12.3123 1.33795 12.4167 1.40787 12.5046 1.49596C12.5925 1.58406 12.6622 1.6886 12.7097 1.80363C12.7572 1.91866 12.7816 2.04192 12.7815 2.16637C12.7813 2.29082 12.7567 2.41402 12.7089 2.52895C12.6612 2.64387 12.5913 2.74827 12.5032 2.83617L12.5055 2.83325Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_48">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span class="text-white text-[14px]">Редактировать</span>
        </button>
      </Show>

      <div class="flex flex-col">
        <div class="text-[#8695A7] flex items-center gap-[5px] mb-[12px]">
          <span>Контакты</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_1_54)">
              <path
                d="M6 12C4.81332 12 3.65328 11.6481 2.66658 10.9888C1.67989 10.3295 0.910851 9.39246 0.456726 8.2961C0.00259972 7.19975 -0.11622 5.99335 0.115291 4.82946C0.346802 3.66558 0.918247 2.59648 1.75736 1.75736C2.59648 0.918247 3.66558 0.346802 4.82946 0.115291C5.99335 -0.11622 7.19975 0.00259972 8.2961 0.456726C9.39246 0.910851 10.3295 1.67989 10.9888 2.66658C11.6481 3.65328 12 4.81332 12 6C11.9983 7.59077 11.3656 9.1159 10.2407 10.2407C9.1159 11.3656 7.59077 11.9983 6 12ZM6 1C5.0111 1 4.0444 1.29325 3.22215 1.84265C2.39991 2.39206 1.75904 3.17296 1.38061 4.08659C1.00217 5.00022 0.90315 6.00555 1.09608 6.97546C1.289 7.94536 1.76521 8.83628 2.46447 9.53554C3.16373 10.2348 4.05465 10.711 5.02455 10.9039C5.99446 11.0969 6.99979 10.9978 7.91342 10.6194C8.82705 10.241 9.60794 9.6001 10.1574 8.77785C10.7068 7.95561 11 6.98891 11 6C10.9985 4.67437 10.4713 3.40344 9.53393 2.46608C8.59656 1.52871 7.32564 1.00146 6 1Z"
                fill="#8695A7"
              />
              <path
                d="M7 9.5H6V6H5V5H6C6.26522 5 6.51957 5.10536 6.70711 5.29289C6.89464 5.48043 7 5.73478 7 6V9.5Z"
                fill="#8695A7"
              />
              <path
                d="M6 4C6.41421 4 6.75 3.66421 6.75 3.25C6.75 2.83579 6.41421 2.5 6 2.5C5.58579 2.5 5.25 2.83579 5.25 3.25C5.25 3.66421 5.58579 4 6 4Z"
                fill="#8695A7"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_54">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="bg-[#F0F4FA] text-[#11253E] leading-[40px] rounded-md p-[10px]">
          <Show
            when={!isEdit()}
            fallback={
              <input
                ref={inputRef}
                value={inputValue()}
                onChange={(event) => {
                  handleChange(event);
                }}
                class="w-full focus:outline-0 duration-500 bg-inherit"
              ></input>
            }
          >
            <span>{phone()}</span>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default CardListItem;

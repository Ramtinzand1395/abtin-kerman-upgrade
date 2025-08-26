import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Stepper from "./Stepper";
import StepperControll from "./StepperControll";
import Search from "./steps/Search";
import AddUserForm from "./steps/AddUserForm";
import AddOrderForm from "./steps/AddOrderForm";
import { AxiosError } from "axios";
import { Customer, customerOrder } from "../../../../types";
import {
  addCustomer,
  addCustomerOrder,
  searchCustomer,
} from "../../../../services/ApiServices";
import { orderSchema } from "../../../../validations/CustomerAppValidation";
import Spiner from "../../../utils/Spiner";

interface AddOrderModalProps {
  closeModal: () => void;
  setOrders: React.Dispatch<React.SetStateAction<customerOrder[]>>;
}

const RegisterForm = ({ setOrders, closeModal }: AddOrderModalProps) => {
  const [currentStep, setcurrentStep] = useState(1);
  const [loadingName, setloadingName] = useState(false);
  const [loadingAddCustomer, setloadingAddCustomer] = useState(false);
  const steps = [" جستجو", "ثبت فرد", "ثبت سفارش"];

  const [customerData, setCustomerData] = useState<Customer>({
    _id: "",
    name: "",
    mobile: "",
    lastName: "",
    createdAt: "",
    updatedAt: "",
    persianDate: "",
    sex: "",
    birthday: "",
    description: "",
  });

  const [Order, setOrder] = useState<customerOrder>({
    _id: "",
    list: [],
    price: null,
    customer: "",
    description: "",
    consoleType: "",
    deliveryStatus: "",
    createdAt: "",
    updatedAt: "",
    persianDate: "",
    deliveryCode: "",
    deliveryDate: "",
  });
  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Search
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        );
      case 2:
        return (
          <AddUserForm
            loadingName={loadingName}
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        );
      case 3:
        return (
          <AddOrderForm
            handleSubmite={handleSubmite}
            Order={Order}
            setOrder={setOrder}
            loadingAddCustomer={loadingAddCustomer}
          />
        );

      default:
    }
  };

  const handleClick = (direction?: string) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setcurrentStep(newStep);
  };

  const handleSearch = async () => {
    setloadingName(true);
    if (customerData.mobile === "") {
      alert("لطفا شماره تلفن را وارد کنید");
      return;
    } else {
      try {
        const { data: response, status } = await searchCustomer(
          customerData.mobile
        );
        if (status === 200) {
          setCustomerData(response.Data);
          toast.info(`شماره تلفن ${customerData.mobile} وجود دارد.`);
        }
        setloadingName(false);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response && err.status === 404) {
            setCustomerData({
              _id: "",
              name: "",
              mobile: customerData.mobile,
              lastName: "",
              createdAt: "",
              updatedAt: "",
              persianDate: "",
              sex: "",
              birthday: "",
              description: "",
            });
          }
          toast.warning(` اطلاعات ${customerData.mobile} را وارد کنید. `);
          console.log(err);
        } else {
          console.error("Unexpected error", err);
        }
      } finally {
        setloadingName(false);
      }
    }
  };
  const handleAddCustomer = async () => {
    if (customerData.lastName === "") {
      alert("لطفا نام خانوادگی را وارد کنید");
      return;
    } else {
      try {
        const { data: response, status } = await addCustomer(customerData);

        if (status === 201) {
          setCustomerData((prev) => ({
            ...prev,
            _id: response.Data._id,
          }));
        }
        toast.info(response.message);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response && err.status === 400) {
            alert(err.message);
          }
          console.log(err);
        } else {
          // Handle other types of errors (e.g., if not AxiosError)
          console.error("Unexpected error", err);
        }
      }
    }
  };

  const handleSubmite = async () => {
    setloadingAddCustomer(true);
    try {
      await orderSchema.validate(Order, { abortEarly: false });

      const { data } = await addCustomerOrder(Order, customerData);
      toast.success(data.message);
      if (data.sms.statusCode === 200) {
        toast.success(` .ارسال پیام به مشتری انجام شد. ${data.sms.body}`);
      } else {
        toast.error(`خطا در ارسال پیام به مشتری ${data.sms.body}`);
      }
      // ✅ به‌روزرسانی لوکال لیست سفارش‌ها
      setOrders((prevOrders) => [...prevOrders, data.Data]);
      closeModal();
      setloadingAddCustomer(false);
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((e) => {
          if (e.message) toast.error(e.message);
        });
      } else {
        console.log(err);
        toast.error("خطای نامشخصی رخ داده است");
      }
    } finally {
      setloadingAddCustomer(false);
    }
  };
  if (loadingName || loadingAddCustomer) return <Spiner />;
  return (
    <>
      {/**Steper */}
      <div className="container mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
        {/**Display components */}
        <div className="my-10 p-10">{displayStep(currentStep)}</div>
      </div>
      {/**Navigation */}
      {currentStep !== steps.length + 1 && (
        <StepperControll
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
          handleSearch={handleSearch}
          handleAddCustomer={handleAddCustomer}
          customerData={customerData}
        />
      )}
    </>
  );
};

export default RegisterForm;

import Heading from '@/components/shared/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { updateProfile } from '@/lib/users-api';
import { validateDate } from '@/lib/utils';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon, Edit, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useParams, useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import defaultAvt from '../../assets/avatar.png';
import StudentFeedTable from './components/account-feed-table';
import { useGetDetailedUser, useGetUsers } from './queries/queries';
export default function AccountDetailPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const userIdParam = useParams().userId;
  const userId = Number(userIdParam) || 0;
  const { data, isLoading } = useGetUsers(page, pageLimit);
  const { data: detailedUser, isLoading: detailedLoading } =
    useGetDetailedUser(userId);
  const users = data?.content;
  const totalUsers = data?.totalElements;
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    birthday: detailedUser?.birthday,
    email: detailedUser?.email,
    gender: detailedUser?.gender,
    name: detailedUser?.name
  });
  const ownId = localStorage.getItem('userId');
  const [isDateValid, setIsDateValid] = useState(true);
  useEffect(() => {
    setFormData({
      birthday: detailedUser?.birthday,
      email: detailedUser?.email,
      gender: detailedUser?.gender,
      name: detailedUser?.name
    });
  }, [detailedUser]);

  if (isLoading || detailedLoading) {
    return <h1>Loading!!!</h1>;
  }

  const handleSubmitForm = async () => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    if (formData.birthday) {
      formData.birthday = new Date(formData.birthday).toLocaleDateString(undefined, options).replace(/\//g, '-');
    }
    console.log(formData);
    await updateProfile(formData);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="p-10">
      <Toaster richColors position="top-right" />
      <div className="flex items-center justify-between">
        <Heading title={'Personal Details'} />
        <div className="flex justify-end gap-3">
          <Button onClick={() => router.push("/account")}>
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      <div className="grid  grid-cols-1 gap-6 py-6 lg:grid-cols-4">
        <div className=" col-span-1 flex flex-col gap-6 lg:col-span-1">
          <Card className="bg-secondary  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between font-bold">
              <p className="text-xl"> Profile</p>
              <Badge className={`${detailedUser.isActive === true ? "bg-green-600" : "bg-red-600"} h-6`}>{detailedUser.isActive === true ? "Active" : "Locked"}</Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <img
                src={detailedUser.avatar || defaultAvt}
                className="rounded-l-[40%] rounded-r-[40%] "
              />
            </CardContent>
          </Card>
        </div>
        {/* contact information  */}
        <Card className=" col-span-1 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-3">
          <CardHeader className="text-xl font-bold">
            <div className="flex flex-row justify-between">
              <p>Contact Information</p>
              {ownId !== null && userId === parseInt(ownId, 10) && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setEditing(!editing);
                    if (editing) {
                      handleSubmitForm();
                    }
                  }}
                >
                  {editing ? <Save /> : <Edit />}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="font-bold text-black">Name</p>
                {editing ? (
                  <Input
                    className="w-[80%] text-muted-foreground"
                    defaultValue={formData?.name}
                    onChange={(event) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        name: event.target.value
                      }))
                    }
                  />
                ) : (
                  <p className="text-muted-foreground">{detailedUser?.name}</p>
                )}
              </div>

              <div>
                <p className="font-bold text-black">Gender</p>
                <Select defaultValue={detailedUser?.gender} disabled={!editing} onValueChange={(value) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    gender: value
                  }));
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">MALE</SelectItem>
                    <SelectItem value="FEMALE">FEMALE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="font-bold text-black">Email</p>
                {editing ? (
                  <Input
                    className="w-[80%] text-muted-foreground"
                    defaultValue={formData?.email}
                    onChange={(event) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        email: event.target.value
                      }))
                    }
                  />
                ) : (
                  <p className="text-muted-foreground">{detailedUser?.email}</p>
                )}
              </div>

              <div>
                <p className="font-bold text-black">Date of Birth</p>
                {editing ? (
                  <>
                    <InputMask
                      mask="9999-99-99"
                      defaultValue={formData?.birthday}
                      onChange={(event) => {
                        const dateStr = event.target.value;
                        if (validateDate(dateStr)) {
                          setIsDateValid(true);
                          setFormData((prevState) => ({
                            ...prevState,
                            birthday: dateStr
                          }));
                        } else {
                          setIsDateValid(false);
                        }
                      }}
                    >
                      {(inputProps) => (
                        <Input
                          {...inputProps}
                          className={`w-[80%] text-muted-foreground ${!isDateValid ? 'border-red-500' : ''}`}
                          defaultValue={formData?.birthday}
                        />
                      )}
                    </InputMask>
                    {!isDateValid && (
                      <p className="text-red-500">
                        Invalid date, date must be yyyy-MM-dd format
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    {detailedUser?.birthday}
                  </p>
                )}
              </div>
              {/* <div className='mt-2'>
                <Button onClick={() => router.back()}>
                  <KeyRoundIcon className="h-4 w-4 mr-4 " />
                  Change password
                </Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
      <StudentFeedTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}

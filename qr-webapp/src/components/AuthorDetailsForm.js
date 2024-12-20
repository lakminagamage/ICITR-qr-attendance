import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthorDetailsForm({ formData }) {
  return (
    <Card className="w-full h-full bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg font-monterrat">
      <CardHeader>
        <CardTitle className="text-2xl">Author Details</CardTitle>
        <p className="text-xl text-muted-foreground">
          Please confirm if your details below here are accurate
        </p>
      </CardHeader>
      <CardContent>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900 font-semibold">Name</dt>
              <dd className="mt-1 text-2xl font-semibold leading-6 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.Title + " " + formData.Name_With_Initials || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900 font-semibold">University/Institution</dt>
              <dd className="mt-1 text-2xl font-semibold leading-6 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.University || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900 font-semibold">Paper Title</dt>
              <dd className="mt-1 text-2xl font-semibold leading-9 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.Paper_Title || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900">Email Address</dt>
              <dd className="mt-1 text-2xl font-normal leading-6 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.Email || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900">Locality</dt>
              <dd className="mt-1 text-2xl font-normal leading-6 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.Locality || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900">Registration Type</dt>
              <dd className="mt-1 text-2xl font-normal leading-6 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.Registration_Type || ""}
              </dd>
            </div>
            
            {/* <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-xl leading-6 text-gray-900">Contact Number</dt>
              <dd className="mt-1 text-xl leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Contact_Number || ""}
              </dd>
            </div> */}
            
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-3">
              <dt className="text-2xl leading-6 text-gray-900">IEEE Membership Status</dt>
              <dd className="mt-1 text-2xl leading-6 text-gray-950 sm:col-span-3 sm:mt-0">
                {formData.IEEE_Membership || ""}
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}

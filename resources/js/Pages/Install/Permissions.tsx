import { PageProps } from "@/types";
import ErrorIcon from "./partials/ErrorIcon";
import PassesIcon from "./partials/PassesIcon";
import InstallationLayout from "@/Layouts/InstallationLayout";
import ButtonNavError from "./partials/ButtonNavError";
import ButtonNavSuccess from "./partials/ButtonNavSuccess";
import StatusCheckerBox from "./partials/StatusCheckerBox";
import TableHead from "./partials/TableHead";
import TableBody from "./partials/TableBody";

type IPermissionProps = PageProps<{
  errors: boolean | null;
  results: {
    folder: string;
    permission: string;
    isSet: boolean;
  }[];
}>;

export default function Permissions({
  errors,
  permissions,
  process_user,
}: PageProps<{ permissions: IPermissionProps; process_user: string }>) {
  return (
    <InstallationLayout step={2} errors={errors} title="Permissions">
      <div className="p-3">
        <h4 className="my-5 text-lg font-semibold text-neutral-800">
          Files and folders permissions
        </h4>

        <p className="text-neutral-700">
          These folders must be writable by web server user:
          <strong className="select-all">{` ${process_user}`}</strong>
          <br />
          Recommended permissions:
          <strong className="select-all">{" 0775"}</strong>
          <br />
          <br />
        </p>

        <StatusCheckerBox>
          <TableHead>
            <TableHead.Content>Extension</TableHead.Content>
            <TableHead.Content>Enabled</TableHead.Content>
          </TableHead>

          <TableBody>
            {Object.keys(permissions.results).map((key, index) => (
              <TableBody.Row key={key}>
                <TableBody.Content className="font-medium">
                  {permissions.results[index].folder.trim().replace(/\/+$/, "")}
                </TableBody.Content>
                <TableBody.Content>
                  <span
                    className={`${
                      permissions.results[index].isSet
                        ? "text-success-500"
                        : "text-danger-500"
                    } inline-flex`}
                  >
                    {permissions.results[index].isSet ? (
                      <PassesIcon />
                    ) : (
                      <ErrorIcon />
                    )}

                    {permissions.results[index].permission}
                  </span>
                </TableBody.Content>
              </TableBody.Row>
            ))}
          </TableBody>
        </StatusCheckerBox>
      </div>

      {permissions["errors"] && permissions["errors"] == true ? (
        <ButtonNavError />
      ) : (
        <ButtonNavSuccess url={route("install.setup")} />
      )}
    </InstallationLayout>
  );
}

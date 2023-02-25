/* Options:
Date: 2023-02-08 08:17:50
Version: 6.60
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//GlobalNamespace: 
MakePropertiesOptional: True
AddServiceStackTypes: True
AddResponseStatus: True
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

export interface IReturn<T> {
	createResponse(): T;
}

export interface IReturnVoid {
	createResponse(): void;
}

export interface IPost {}

export interface ICreateDb<Table> {}

export interface IDelete {}

export interface IDeleteDb<Table> {}

export interface IPatch {}

export interface IPatchDb<Table> {}

export interface IPut {}

export interface IUpdateDb<Table> {}

export interface IHasSessionId {
	sessionId?: string;
}

export interface IHasBearerToken {
	bearerToken?: string;
}

export interface IGet {}

import type { Medication } from "$lib/types/types";

export interface IReturn<T> {
	createResponse(): T;
}

export interface IReturnVoid {
	createResponse(): void;
}

export interface IPost {}

export interface ICreateDb<Table> {}

export interface IDelete {}

export interface IDeleteDb<Table> {}

export interface IPatch {}

export interface IPatchDb<Table> {}

export interface IPut {}

export interface IUpdateDb<Table> {}

export interface IHasSessionId {
	sessionId?: string;
}

export interface IHasBearerToken {
	bearerToken?: string;
}

export interface IGet {}

// @DataContract
export class QueryBase {
	// @DataMember(Order=1)
	public skip?: number;

	// @DataMember(Order=2)
	public take?: number;

	// @DataMember(Order=3)
	public orderBy?: string;

	// @DataMember(Order=4)
	public orderByDesc?: string;

	// @DataMember(Order=5)
	public include?: string;

	// @DataMember(Order=6)
	public fields?: string;

	// @DataMember(Order=7)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<QueryBase>) {
		(Object as any).assign(this, init);
	}
}

export class QueryDb<T> extends QueryBase {
	public constructor(init?: Partial<QueryDb<T>>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class AuditBase {
	// @DataMember(Order=1)
	public createdDate?: string;

	// @DataMember(Order=2)
	// @Required()
	public createdBy?: string;

	// @DataMember(Order=3)
	public modifiedDate?: string;

	// @DataMember(Order=4)
	// @Required()
	public modifiedBy?: string;

	// @DataMember(Order=5)
	public deletedDate?: string;

	// @DataMember(Order=6)
	public deletedBy?: string;

	public constructor(init?: Partial<AuditBase>) {
		(Object as any).assign(this, init);
	}
}

export class AppUser {
	public id?: number;
	public displayName?: string;
	public email?: string;
	// @Input(Type="file")
	public profileUrl?: string;

	public lastLoginIp?: string;
	public lastLoginDate?: string;
	public userName?: string;
	public primaryEmail?: string;
	public phoneNumber?: string;
	public firstName?: string;
	public lastName?: string;
	public company?: string;
	public birthDate?: string;
	public birthDateRaw?: string;
	public address?: string;
	public address2?: string;
	public city?: string;
	public state?: string;
	public country?: string;
	public culture?: string;
	public fullName?: string;
	public gender?: string;
	public language?: string;
	public mailAddress?: string;
	public nickname?: string;
	public postalCode?: string;
	public timeZone?: string;
	public roles?: string[];
	public permissions?: string[];
	public createdDate?: string;
	public modifiedDate?: string;
	public invalidLoginAttempts?: number;
	public lastLoginAttempt?: string;
	public lockedDate?: string;
	public refId?: number;
	public refIdStr?: string;
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<AppUser>) {
		(Object as any).assign(this, init);
	}
}

export class Appointments extends AuditBase {
	public id?: string;
	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	public providerName?: string;
	// @References("typeof(TMHAPI.ServiceModel.Types.AppUser)")
	public appUserId?: number;

	public appUser?: AppUser;

	public constructor(init?: Partial<Appointments>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

export class AppointmentEvents extends AuditBase {
	public id?: string;
	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmed?: string;
	public dateTimeUserSkipped?: string;
	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	// @References("typeof(TMHAPI.ServiceModel.Types.Appointments)")
	public appointmentId?: string;

	public appointment?: Appointments;
	public appointmentEventNotes?: string;
	// @References("typeof(TMHAPI.ServiceModel.Types.AppUser)")
	public appUserId?: number;

	public appUser?: AppUser;

	public constructor(init?: Partial<AppointmentEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

export enum TreatmentType {
	Medication = "Medication",
	Measurement = "Measurement",
	Activity = "Activity",
	Appointment = "Appointment",
	Other = "Other"
}

export class TreatmentMeasurements extends AuditBase {
	public id?: string;
	public name?: string;
	public description?: string;
	// @Required()
	public treatmentType?: TreatmentType;

	// @Required()
	// @References("typeof(TMHAPI.ServiceModel.Types.UnitType)")
	public unitTypeId?: string;

	// @References("typeof(TMHAPI.ServiceModel.Types.AppUser)")
	public appUserId?: number;

	public appUser?: AppUser;

	public constructor(init?: Partial<TreatmentMeasurements>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

export class Schedules extends AuditBase {
	public id?: string;
	public scheduleTime?: string;
	public startDate?: string;
	public endDate?: string;
	// @References("typeof(TMHAPI.ServiceModel.Types.Treatments)")
	public treatmentId?: string;

	public treatment?: Treatments;
	public isWeekendDifferent?: boolean;
	// @References("typeof(TMHAPI.ServiceModel.Types.Appointments)")
	public appointmentId?: string;

	// @References("typeof(TMHAPI.ServiceModel.Types.AppUser)")
	public appUserId?: number;

	public appUser?: AppUser;
	public lastRunTime?: string;
	public lastRunStatus?: string;
	public nextRunDateTime?: string;
	public scheduleDateTime?: Date;

	public constructor(init?: Partial<Schedules>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

export class Treatments extends AuditBase {
	public id?: string;
	public name?: string;
	public description?: string;
	// @Required()
	public treatmentType?: TreatmentType;

	// @References("typeof(TMHAPI.ServiceModel.Types.AppUser)")
	public appUserId?: number;

	public appUser?: AppUser;
	// @References("typeof(TMHAPI.ServiceModel.Types.UnitType)")
	public unitTypeId?: string;

	public unitTypeName?: string;
	public isMuted?: boolean;
	public dailyFrequency?: number;
	public unitsPlanned?: number;
	// @References("typeof(TMHAPI.ServiceModel.Types.TreatmentMeasurements)")
	public treatmentMeasurementsId?: string;
	public medication?: Medication;
	public treatmentMeasurements?: TreatmentMeasurements;
	public schedules?: Schedules[];
	public isActiveButton?: boolean = false;

	public constructor(init?: Partial<Treatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

export class UnitType {
	public id?: string;
	// @Required()
	public unitName?: string;

	// @Required()
	public unitDescription?: string;

	// @Required()
	public treatmentType?: TreatmentType;

	public constructor(init?: Partial<UnitType>) {
		(Object as any).assign(this, init);
	}
}

export class TreatmentScheduledEvents extends AuditBase {
	public id?: string;
	public mood?: number;
	// @References("typeof(TMHAPI.ServiceModel.Types.Schedules)")
	public scheduleId?: string;

	public schedule?: Schedules;
	// @References("typeof(TMHAPI.ServiceModel.Types.Treatments)")
	public treatmentId?: string;

	public treatment?: Treatments;
	// @References("typeof(TMHAPI.ServiceModel.Types.AppUser)")
	public appUserId?: number;

	public appUser?: AppUser;
	public completed?: boolean;
	// @Required()
	public treatmentType?: TreatmentType;

	// @References("typeof(TMHAPI.ServiceModel.Types.TreatmentMeasurements)")
	public treatmentMeasurementsId?: string;

	public treatmentMeasurement?: TreatmentMeasurements;
	public unitsPlanned?: number;
	public unitsTaken?: number;
	// @References("typeof(TMHAPI.ServiceModel.Types.UnitType)")
	public unitTypeId?: string;

	public unitType?: UnitType;
	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmedEvent?: string;
	public dateTimeSkippedEvent?: string;
	public customerNotes?: string;

	public constructor(init?: Partial<TreatmentScheduledEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
}

export class UserAuthRole {
	public id?: number;
	public userAuthId?: number;
	public role?: string;
	public permission?: string;
	public createdDate?: string;
	public modifiedDate?: string;
	public refId?: number;
	public refIdStr?: string;
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<UserAuthRole>) {
		(Object as any).assign(this, init);
	}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateBase<Table> implements IPost, ICreateDb<Table> {
	// @Validate(Validator="GreaterThan(0)")
	public appUserId?: number;

	public constructor(init?: Partial<CreateBase<Table>>) {
		(Object as any).assign(this, init);
	}
}

export class UserAuthDetails {
	public id?: number;
	public userAuthId?: number;
	public provider?: string;
	public userId?: string;
	public userName?: string;
	public fullName?: string;
	public displayName?: string;
	public firstName?: string;
	public lastName?: string;
	public company?: string;
	public email?: string;
	public phoneNumber?: string;
	public birthDate?: string;
	public birthDateRaw?: string;
	public address?: string;
	public address2?: string;
	public city?: string;
	public state?: string;
	public country?: string;
	public culture?: string;
	public gender?: string;
	public language?: string;
	public mailAddress?: string;
	public nickname?: string;
	public postalCode?: string;
	public timeZone?: string;
	public refreshToken?: string;
	public refreshTokenExpiry?: string;
	public requestToken?: string;
	public requestTokenSecret?: string;
	public items?: { [index: string]: string };
	public accessToken?: string;
	public accessTokenSecret?: string;
	public createdDate?: string;
	public modifiedDate?: string;
	public refId?: number;
	public refIdStr?: string;
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<UserAuthDetails>) {
		(Object as any).assign(this, init);
	}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteBase<Table> implements IDelete, IDeleteDb<Table> {
	public constructor(init?: Partial<DeleteBase<Table>>) {
		(Object as any).assign(this, init);
	}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class PatchBase<Table> implements IPatch, IPatchDb<Table> {
	// @Validate(Validator="GreaterThan(0)")
	public appUserId?: number;

	public constructor(init?: Partial<PatchBase<Table>>) {
		(Object as any).assign(this, init);
	}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateBase<Table> implements IPut, IUpdateDb<Table> {
	// @Validate(Validator="GreaterThan(0)")
	public appUserId?: number;

	public constructor(init?: Partial<UpdateBase<Table>>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class ResponseError {
	// @DataMember(Order=1)
	public errorCode?: string;

	// @DataMember(Order=2)
	public fieldName?: string;

	// @DataMember(Order=3)
	public message?: string;

	// @DataMember(Order=4)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<ResponseError>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class ResponseStatus {
	// @DataMember(Order=1)
	public errorCode?: string;

	// @DataMember(Order=2)
	public message?: string;

	// @DataMember(Order=3)
	public stackTrace?: string;

	// @DataMember(Order=4)
	public errors?: ResponseError[];

	// @DataMember(Order=5)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<ResponseStatus>) {
		(Object as any).assign(this, init);
	}
}

export class HelloResponse {
	public result?: string;

	public constructor(init?: Partial<HelloResponse>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken {
	// @DataMember(Order=1)
	public userId?: string;

	// @DataMember(Order=2)
	public sessionId?: string;

	// @DataMember(Order=3)
	public userName?: string;

	// @DataMember(Order=4)
	public displayName?: string;

	// @DataMember(Order=5)
	public referrerUrl?: string;

	// @DataMember(Order=6)
	public bearerToken?: string;

	// @DataMember(Order=7)
	public refreshToken?: string;

	// @DataMember(Order=8)
	public profileUrl?: string;

	// @DataMember(Order=9)
	public roles?: string[];

	// @DataMember(Order=10)
	public permissions?: string[];

	// @DataMember(Order=11)
	public responseStatus?: ResponseStatus;

	// @DataMember(Order=12)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<AuthenticateResponse>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class AssignRolesResponse {
	// @DataMember(Order=1)
	public allRoles?: string[];

	// @DataMember(Order=2)
	public allPermissions?: string[];

	// @DataMember(Order=3)
	public meta?: { [index: string]: string };

	// @DataMember(Order=4)
	public responseStatus?: ResponseStatus;

	public constructor(init?: Partial<AssignRolesResponse>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class UnAssignRolesResponse {
	// @DataMember(Order=1)
	public allRoles?: string[];

	// @DataMember(Order=2)
	public allPermissions?: string[];

	// @DataMember(Order=3)
	public meta?: { [index: string]: string };

	// @DataMember(Order=4)
	public responseStatus?: ResponseStatus;

	public constructor(init?: Partial<UnAssignRolesResponse>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class RegisterResponse implements IHasSessionId, IHasBearerToken {
	// @DataMember(Order=1)
	public userId?: string;

	// @DataMember(Order=2)
	public sessionId?: string;

	// @DataMember(Order=3)
	public userName?: string;

	// @DataMember(Order=4)
	public referrerUrl?: string;

	// @DataMember(Order=5)
	public bearerToken?: string;

	// @DataMember(Order=6)
	public refreshToken?: string;

	// @DataMember(Order=7)
	public roles?: string[];

	// @DataMember(Order=8)
	public permissions?: string[];

	// @DataMember(Order=9)
	public responseStatus?: ResponseStatus;

	// @DataMember(Order=10)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<RegisterResponse>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class QueryResponse<AppointmentEvents> {
	// @DataMember(Order=1)
	public offset?: number;

	// @DataMember(Order=2)
	public total?: number;

	// @DataMember(Order=3)
	public results?: AppointmentEvents[];

	// @DataMember(Order=4)
	public meta?: { [index: string]: string };

	// @DataMember(Order=5)
	public responseStatus?: ResponseStatus;

	public constructor(init?: Partial<QueryResponse<AppointmentEvents>>) {
		(Object as any).assign(this, init);
	}
}

// @DataContract
export class IdResponse {
	// @DataMember(Order=1)
	public id?: string;

	// @DataMember(Order=2)
	public responseStatus?: ResponseStatus;

	public constructor(init?: Partial<IdResponse>) {
		(Object as any).assign(this, init);
	}
}

export class Hello implements IReturn<HelloResponse> {
	public name?: string;
	public jslkjsdflkj?: string;

	public constructor(init?: Partial<Hello>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "Hello";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new HelloResponse();
	}
}

/** @description Sign In */
// @Route("/auth", "OPTIONS,GET,POST,DELETE")
// @Route("/auth/{provider}", "OPTIONS,GET,POST,DELETE")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost {
	/** @description AuthProvider, e.g. credentials */
	// @DataMember(Order=1)
	public provider?: string;

	// @DataMember(Order=2)
	public state?: string;

	// @DataMember(Order=3)
	public oauth_token?: string;

	// @DataMember(Order=4)
	public oauth_verifier?: string;

	// @DataMember(Order=5)
	public userName?: string;

	// @DataMember(Order=6)
	public password?: string;

	// @DataMember(Order=7)
	public rememberMe?: boolean;

	// @DataMember(Order=9)
	public errorView?: string;

	// @DataMember(Order=10)
	public nonce?: string;

	// @DataMember(Order=11)
	public uri?: string;

	// @DataMember(Order=12)
	public response?: string;

	// @DataMember(Order=13)
	public qop?: string;

	// @DataMember(Order=14)
	public nc?: string;

	// @DataMember(Order=15)
	public cnonce?: string;

	// @DataMember(Order=17)
	public accessToken?: string;

	// @DataMember(Order=18)
	public accessTokenSecret?: string;

	// @DataMember(Order=19)
	public scope?: string;

	// @DataMember(Order=20)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<Authenticate>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "Authenticate";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new AuthenticateResponse();
	}
}

// @Route("/assignroles", "POST")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost {
	// @DataMember(Order=1)
	public userName?: string;

	// @DataMember(Order=2)
	public permissions?: string[];

	// @DataMember(Order=3)
	public roles?: string[];

	// @DataMember(Order=4)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<AssignRoles>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "AssignRoles";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new AssignRolesResponse();
	}
}

// @Route("/unassignroles", "POST")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost {
	// @DataMember(Order=1)
	public userName?: string;

	// @DataMember(Order=2)
	public permissions?: string[];

	// @DataMember(Order=3)
	public roles?: string[];

	// @DataMember(Order=4)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<UnAssignRoles>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UnAssignRoles";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new UnAssignRolesResponse();
	}
}

/** @description Sign Up */
// @Route("/register", "PUT,POST")
// @Api(Description="Sign Up")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost {
	// @DataMember(Order=1)
	public userName?: string;

	// @DataMember(Order=2)
	public firstName?: string;

	// @DataMember(Order=3)
	public lastName?: string;

	// @DataMember(Order=4)
	public displayName?: string;

	// @DataMember(Order=5)
	public email?: string;

	// @DataMember(Order=6)
	public password?: string;

	// @DataMember(Order=7)
	public confirmPassword?: string;

	// @DataMember(Order=8)
	public autoLogin?: boolean;

	// @DataMember(Order=10)
	public errorView?: string;

	// @DataMember(Order=11)
	public meta?: { [index: string]: string };

	public constructor(init?: Partial<Register>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "Register";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new RegisterResponse();
	}
}

// @Route("/appointmentevents", "GET")
// @Route("/appointmentevents/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryAppointmentEvents
	extends QueryDb<AppointmentEvents>
	implements IReturn<QueryResponse<AppointmentEvents>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QueryAppointmentEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryAppointmentEvents";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<AppointmentEvents>();
	}
}

// @Route("/appointments", "GET")
// @Route("/appointments/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryAppointments
	extends QueryDb<Appointments>
	implements IReturn<QueryResponse<Appointments>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QueryAppointments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryAppointments";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<Appointments>();
	}
}

// @Route("/appusers", "GET")
// @Route("/appusers/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryAppUsers
	extends QueryDb<AppUser>
	implements IReturn<QueryResponse<AppUser>>, IGet
{
	public id?: number;

	public constructor(init?: Partial<QueryAppUsers>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryAppUsers";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<AppUser>();
	}
}

// @Route("/schedules", "GET")
// @Route("/schedules/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QuerySchedules
	extends QueryDb<Schedules>
	implements IReturn<QueryResponse<Schedules>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QuerySchedules>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QuerySchedules";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<Schedules>();
	}
}

// @Route("/treatmentmeasurements", "GET")
// @Route("/treatmentmeasurements/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryTreatmentMeasurements
	extends QueryDb<TreatmentMeasurements>
	implements IReturn<QueryResponse<TreatmentMeasurements>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QueryTreatmentMeasurements>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryTreatmentMeasurements";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<TreatmentMeasurements>();
	}
}

// @Route("/treatments", "GET")
// @Route("/treatments/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryTreatments
	extends QueryDb<Treatments>
	implements IReturn<QueryResponse<Treatments>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QueryTreatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryTreatments";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<Treatments>();
	}
}

// @Route("/treatmentscheduledevents", "GET")
// @Route("/treatmentscheduledevents/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryTreatmentScheduledEvents
	extends QueryDb<TreatmentScheduledEvents>
	implements IReturn<QueryResponse<TreatmentScheduledEvents>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QueryTreatmentScheduledEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryTreatmentScheduledEvents";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<TreatmentScheduledEvents>();
	}
}

// @Route("/unittypes", "GET")
// @Route("/unittypes/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryUnitTypes
	extends QueryDb<UnitType>
	implements IReturn<QueryResponse<UnitType>>, IGet
{
	public id?: string;

	public constructor(init?: Partial<QueryUnitTypes>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryUnitTypes";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<UnitType>();
	}
}

// @Route("/userauthroles", "GET")
// @Route("/userauthroles/{Id}", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryUserAuthRoles
	extends QueryDb<UserAuthRole>
	implements IReturn<QueryResponse<UserAuthRole>>, IGet
{
	public id?: number;

	public constructor(init?: Partial<QueryUserAuthRoles>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "QueryUserAuthRoles";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new QueryResponse<UserAuthRole>();
	}
}

// @Route("/appointmentevents", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateAppointmentEvents
	extends CreateBase<AppointmentEvents>
	implements IReturn<IdResponse>
{
	public version?: number;
	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmed?: string;
	public dateTimeUserSkipped?: string;
	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	// @Validate(Validator="GreaterThan(0)")
	public appointmentId?: string;

	public appointmentEventNotes?: string;
	public test33?: string;

	public constructor(init?: Partial<CreateAppointmentEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateAppointmentEvents";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointments", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateAppointments extends CreateBase<Appointments> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public apptDateTime?: string;

	public place?: string;
	public placeNotes?: string;
	public providerName?: string;

	public constructor(init?: Partial<CreateAppointments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateAppointments";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/unittypes", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateUnitType implements IReturn<IdResponse>, IPost, ICreateDb<UnitType> {
	// @Validate(Validator="NotEmpty")
	public unitName?: string;

	// @Validate(Validator="NotEmpty")
	public unitDescription?: string;

	// @Validate(Validator="NotEmpty")
	public treatmentType?: TreatmentType;

	public constructor(init?: Partial<CreateUnitType>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateUnitType";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/schedules", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateSchedules extends CreateBase<Schedules> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public scheduleTime?: string;

	public startDate?: string;
	public endDate?: string;
	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public treatmentId?: string;

	public isWeekendDifferent?: boolean;
	public appointmentId?: string;
	public treatmentUserId?: string;
	public lastRunTime?: string;
	public lastRunStatus?: string;
	public nextRunDateTime?: string;

	public constructor(init?: Partial<CreateSchedules>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateSchedules";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatments", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateTreatments extends CreateBase<Treatments> implements IReturn<IdResponse> {
	// @Validate(Validator="NotEmpty")
	public name?: string;

	public description?: string;
	// @Validate(Validator="NotNull")
	public treatmentType?: TreatmentType;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public unitTypeId?: string;

	public isMuted?: boolean;
	public dailyFrequency?: number;
	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public unitsPlanned?: number;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public treatmentMeasurementsId?: string;

	// @References("typeof(TMHAPI.ServiceModel.Types.Schedules)")
	public schedules?: Schedules[];

	public constructor(init?: Partial<CreateTreatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateTreatments";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatmentmeasurements", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateTreatmentMeasurements
	extends CreateBase<TreatmentMeasurements>
	implements IReturn<IdResponse>
{
	[key: string]: any;
	public name?: string;

	public description?: string;
	// @Validate(Validator="NotNull")
	public treatmentType?: TreatmentType;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public unitTypeId?: string;

	public isMuted?: boolean;
	public dailyFrequency?: number;
	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public unitsPlanned?: number;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public treatmentMeasurementsId?: string;

	// @References("typeof(TMHAPI.ServiceModel.Types.Schedules)")
	public schedules?: Schedules[];

	public constructor(init?: Partial<CreateTreatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateTreatmentMeasurements";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatmentscheduledevents", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateTreatmentScheduledEvents
	extends CreateBase<TreatmentScheduledEvents>
	implements IReturn<IdResponse>
{
	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public mood?: number;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public scheduleId?: string;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public treatmentId?: string;

	// @Validate(Validator="NotNull")
	public completed?: boolean;

	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public treatmentMeasurementsId?: string;

	// @Validate(Validator="NotNull")
	public unitsPlanned?: number;

	// @Validate(Validator="NotNull")
	public unitsTaken?: number;

	// @Validate(Validator="NotNull")
	public unitTypeId?: string;

	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmedEvent?: string;
	public dateTimeSkippedEvent?: string;
	public customerNotes?: string;

	public constructor(init?: Partial<CreateTreatmentScheduledEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateTreatmentScheduledEvents";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/userauthdetails", "POST")
export class CreateUserAuthDetails
	implements IReturn<IdResponse>, IPost, ICreateDb<UserAuthDetails>
{
	public id?: string;
	public unitName?: string;
	public unitDescription?: string;

	public constructor(init?: Partial<CreateUserAuthDetails>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateUserAuthDetails";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/userauthroles", "POST")
// @ValidateRequest(Validator="IsAuthenticated")
export class CreateUserAuthRole implements IReturn<IdResponse>, IPost, ICreateDb<UserAuthRole> {
	public userAuthId?: number;
	public role?: string;
	public permission?: string;
	public createdDate?: string;
	public modifiedDate?: string;
	public refId?: number;
	public refIdStr?: string;
	public meta?: string;

	public constructor(init?: Partial<CreateUserAuthRole>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "CreateUserAuthRole";
	}
	public getMethod() {
		return "POST";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointmentevents/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteAppointmentEvents
	extends DeleteBase<AppointmentEvents>
	implements IReturn<IdResponse>
{
	public version?: number;
	public id?: string;

	public constructor(init?: Partial<DeleteAppointmentEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteAppointmentEvents";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointments/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteAppointments extends DeleteBase<Appointments> implements IReturn<IdResponse> {
	public version?: number;
	public id?: string;

	public constructor(init?: Partial<DeleteAppointments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteAppointments";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appusers/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteAppUser implements IReturn<IdResponse>, IDelete, IDeleteDb<AppUser> {
	public version?: number;
	public id?: number;

	public constructor(init?: Partial<DeleteAppUser>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteAppUser";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/schedules/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteSchedules extends DeleteBase<Schedules> implements IReturn<IdResponse> {
	public id?: string;

	public constructor(init?: Partial<DeleteSchedules>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteSchedules";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatments/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteTreatments extends DeleteBase<Treatments> implements IReturn<IdResponse> {
	public id?: string;

	public constructor(init?: Partial<DeleteTreatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteTreatments";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatmentscheduledevents/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteTreatmentScheduledEvents
	extends DeleteBase<TreatmentScheduledEvents>
	implements IReturn<IdResponse>
{
	public id?: string;

	public constructor(init?: Partial<DeleteTreatmentScheduledEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteTreatmentScheduledEvents";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/unittypes/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteUnitType implements IReturn<IdResponse>, IDelete, IDeleteDb<UnitType> {
	public id?: string;

	public constructor(init?: Partial<DeleteUnitType>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteUnitType";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/userauthroles/{Id}", "DELETE")
// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteUserAuthRole implements IReturn<IdResponse>, IDelete, IDeleteDb<UserAuthRole> {
	public id?: number;

	public constructor(init?: Partial<DeleteUserAuthRole>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "DeleteUserAuthRole";
	}
	public getMethod() {
		return "DELETE";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointmentevents/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchAppointmentEvents
	extends PatchBase<AppointmentEvents>
	implements IReturn<IdResponse>
{
	// @Validate(Validator="NotNull")
	public id?: string;

	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmed?: string;
	public dateTimeUserSkipped?: string;
	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	public appointmentId?: string;
	public appointmentEventNotes?: string;

	public constructor(init?: Partial<PatchAppointmentEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchAppointmentEvents";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointments/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchAppointments extends PatchBase<Appointments> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	public providerName?: string;

	public constructor(init?: Partial<PatchAppointments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchAppointments";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/schedules/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchSchedules extends PatchBase<Schedules> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public scheduleTime?: string;
	public startDate?: string;
	public endDate?: string;
	public treatmentId?: string;
	public isWeekendDifferent?: number;
	public appointmentId?: string;
	public lastRunTime?: string;
	public lastRunStatus?: string;
	public nextRunDateTime?: string;

	public constructor(init?: Partial<PatchSchedules>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchSchedules";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatmentmeasurements/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchTreatmentMeasurements
	extends PatchBase<TreatmentMeasurements>
	implements IReturn<IdResponse>
{
	// @Validate(Validator="NotNull")
	public id?: string;

	public name?: string;
	public description?: string;
	public unitTypeId?: string;

	public constructor(init?: Partial<PatchTreatmentMeasurements>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchTreatmentMeasurements";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatments/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchTreatments extends PatchBase<Treatments> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public name?: string;
	public description?: string;
	// @Validate(Validator="NotEmpty")
	public treatmentType?: TreatmentType;

	public unitTypeId?: string;
	public isMuted?: number;
	public dailyFrequency?: number;
	public unitsPlanned?: number;
	public treatmentMeasurementsId?: string;
	public schedules?: Schedules[];
	public testtttt?: string;

	public constructor(init?: Partial<PatchTreatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchTreatments";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatmentscheduledevents/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchTreatmentScheduledEvents
	extends PatchBase<TreatmentScheduledEvents>
	implements IReturn<IdResponse>
{
	// @Validate(Validator="NotNull")
	public id?: string;

	public mood?: number;
	public scheduleId?: string;
	public treatmentId?: string;
	public completed?: boolean;
	public treatmentMeasurementsId?: string;
	public unitsPlanned?: number;
	public unitsTaken?: number;
	public unitTypeId?: string;
	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmedEvent?: string;
	public dateTimeSkippedEvent?: string;
	public customerNotes?: string;

	public constructor(init?: Partial<PatchTreatmentScheduledEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchTreatmentScheduledEvents";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/unittypes/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchUnitType implements IReturn<IdResponse>, IPatch, IPatchDb<UnitType> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public unitName?: string;
	public unitDescription?: string;

	public constructor(init?: Partial<PatchUnitType>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchUnitType";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/userauthroles/{Id}", "PATCH")
// @ValidateRequest(Validator="IsAuthenticated")
export class PatchUserAuthRole implements IReturn<IdResponse>, IPatch, IPatchDb<UserAuthRole> {
	// @Validate(Validator="NotNull")
	// @Validate(Validator="GreaterThan(0)")
	public id?: number;

	public userAuthId?: number;
	public role?: string;
	public permission?: string;
	public createdDate?: string;
	public modifiedDate?: string;
	public refId?: number;
	public refIdStr?: string;
	public meta?: string;

	public constructor(init?: Partial<PatchUserAuthRole>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "PatchUserAuthRole";
	}
	public getMethod() {
		return "PATCH";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointmentevents/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateAppointmentEvents
	extends UpdateBase<AppointmentEvents>
	implements IReturn<IdResponse>
{
	// @Validate(Validator="NotNull")
	public id?: string;

	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmed?: string;
	public dateTimeUserSkipped?: string;
	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	public appointmentId?: string;
	public appointmentEventNotes?: string;

	public constructor(init?: Partial<UpdateAppointmentEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateAppointmentEvents";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/appointments/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateAppointments extends UpdateBase<Appointments> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public apptDateTime?: string;
	public place?: string;
	public placeNotes?: string;
	public providerName?: string;

	public constructor(init?: Partial<UpdateAppointments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateAppointments";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/schedules/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateSchedules extends UpdateBase<Schedules> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public scheduleTime?: string;
	public startDate?: string;
	public endDate?: string;
	public treatmentId?: string;
	public isWeekendDifferent?: number;
	public appointmentId?: string;
	public lastRunTime?: string;
	public lastRunStatus?: string;
	public nextRunDateTime?: string;

	public constructor(init?: Partial<UpdateSchedules>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateSchedules";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatments/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateTreatments extends UpdateBase<Treatments> implements IReturn<IdResponse> {
	// @Validate(Validator="NotNull")
	public id?: string;

	public name?: string;
	public description?: string;
	// @Validate(Validator="NotEmpty")
	public treatmentType?: TreatmentType;

	public unitTypeId?: string;
	public isMuted?: boolean;
	public dailyFrequency?: number;
	public unitsPlanned?: number;
	public treatmentMeasurementsId?: string;

	public constructor(init?: Partial<UpdateTreatments>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateTreatments";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/treatmentscheduledevents/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateTreatmentScheduledEvents
	extends UpdateBase<TreatmentScheduledEvents>
	implements IReturn<IdResponse>
{
	// @Validate(Validator="NotNull")
	public id?: string;

	public mood?: number;
	public scheduleId?: string;
	public treatmentId?: string;
	public completed?: boolean;
	public treatmentMeasurementsId?: string;
	public unitsPlanned?: number;
	public unitsTaken?: number;
	public unitTypeId?: string;
	public dateTimeEventPlanned?: string;
	public dateTimeUserConfirmedEvent?: string;
	public dateTimeSkippedEvent?: string;
	public customerNotes?: string;
	public schedules?: Schedules[];

	public constructor(init?: Partial<UpdateTreatmentScheduledEvents>) {
		super(init);
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateTreatmentScheduledEvents";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/unittypes/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateUnitType implements IReturn<IdResponse>, IPut, IUpdateDb<UnitType> {
	public id?: string;
	public unitName?: string;
	public unitDescription?: string;

	public constructor(init?: Partial<UpdateUnitType>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateUnitType";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

// @Route("/userauthroles/{Id}", "PUT")
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateUserAuthRole implements IReturn<IdResponse>, IPut, IUpdateDb<UserAuthRole> {
	public id?: number;
	public userAuthId?: number;
	public role?: string;
	public permission?: string;
	public createdDate?: string;
	public modifiedDate?: string;
	public refId?: number;
	public refIdStr?: string;
	public meta?: string;

	public constructor(init?: Partial<UpdateUserAuthRole>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "UpdateUserAuthRole";
	}
	public getMethod() {
		return "PUT";
	}
	public createResponse() {
		return new IdResponse();
	}
}

export class GetMedicationResponse {
	public results?: Medication[];
	public responseStatus?: ResponseStatus;

	public constructor(init?: Partial<GetMedicationResponse>) {
		(Object as any).assign(this, init);
	}
}

// @Route("/medication/{Id}", "GET")
export class GetMedications implements IReturn<GetMedicationResponse>, IGet {
	public searchTerm?: string;

	public constructor(init?: Partial<GetMedications>) {
		(Object as any).assign(this, init);
	}
	public getTypeName() {
		return "GetMedications";
	}
	public getMethod() {
		return "GET";
	}
	public createResponse() {
		return new GetMedicationResponse();
	}
}

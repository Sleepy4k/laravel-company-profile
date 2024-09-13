<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Observers\ApplicationSettingObserver;
use ElipZis\Cacheable\Models\Traits\Cacheable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([ApplicationSettingObserver::class])]
class ApplicationSetting extends Model
{
    use HasFactory, LogsActivity, Cacheable;

    /**
     * The table associated with created data.
     *
     * @var string
     */
    const CREATED_AT = 'created_at';

    /**
     * The table associated with updated data.
     *
     * @var string
     */
    const UPDATED_AT = 'updated_at';

    /**
     * The database connection that should be used by the model.
     *
     * @var string
     */
    protected $connection = 'mysql';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'application_settings';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'display',
        'value',
        'description',
        'type_id',
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that aren't mass assignable to determine if this is a date.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be searchable.
     *
     * @var array<int, string>
     */
    protected $searchable = [
        'id',
        'key',
        'display',
        'value',
        'description',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function getSearchableFields(): array
    {
        return $this->searchable;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'int',
            'uuid' => 'string',
            'key' => 'string',
            'display' => 'string',
            'value' => 'string',
            'description' => 'string',
            'type_id' => 'int',
            'created_at' => 'datetime:Y-m-d',
            'updated_at' => 'datetime:Y-m-d',
        ];
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * The spatie log that setting log option.
     *
     * @var bool
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly($this->fillable)
            ->useLogName('model')
            ->setDescriptionForEvent(fn (string $eventName) => trans('model.activity.description', ['model' => $this->table, 'event' => $eventName]))
            ->dontSubmitEmptyLogs();
    }

    /**
     * The cacheable properties that should be cached.
     *
     * @return array
     */
    public function getCacheableProperties(): array {
        return [
            //How long should cache last in general?
            'ttl' => 300,
            //By what should cache entries be prefixed?
            'prefix' => 'settingcache',
            //What is the identifying, unique column name?
            'identifier' => 'id',
            //Do you need logging?
            'logging' => [
                'enabled' => !app()->environment('production'),
                'level' => 'debug',
            ],
        ];
    }

    /**
     * Get the application settings that owns the application setting type.
     *
     * @return BelongsTo
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(ApplicationSettingType::class, 'type_id', 'id');
    }
}
